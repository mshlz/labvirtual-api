import { FilterQuery, Query, QueryFindOptions } from "mongoose";

interface PaginationOptions {
    page: number,
    per_page: number,
    collation: {},
    lean: boolean,
    leanWithId: boolean,
    projection: {},
    select: string,
    options: QueryFindOptions,
    pagination: boolean,
    useEstimatedCount: boolean,
    useCustomCountFn: boolean,
    forceCountFn: boolean,
    populate: any,
    read?: any,
    sort?: any,
}

export type PaginationResult<T> = {
    data: T[],
    meta: {
        total: number,
        per_page: number,
        current_page: number,
        last_page: number,
        next_page: number,
        prev_page: number,
    }
}

const defaultOptions: Partial<PaginationOptions> = {
    collation: {},
    lean: false,
    leanWithId: true,
    page: 1,
    per_page: 10,
    projection: {},
    select: '',
    options: {},
    pagination: true,
    useEstimatedCount: false,
    useCustomCountFn: false,
    forceCountFn: false,
}

export function paginate<T>(query: FilterQuery<T>, options: PaginationOptions): Promise<PaginationResult<T>> {
    options = {
        ...defaultOptions,
        // @ts-ignore
        ...paginate.options,
        ...options,
    };
    query = query || {};

    const {
        collation,
        lean,
        leanWithId,
        populate,
        projection,
        read,
        select,
        sort,
        pagination,
        useEstimatedCount,
        useCustomCountFn,
        forceCountFn,
    } = options;

    let per_page = defaultOptions.per_page;

    if (pagination) {
        per_page = options.per_page && options.per_page > 0 ? options.per_page : 10;
    }

    const findOptions = options.options;

    let page;
    let skip;

    let docsPromise: Promise<any>;

    if (Object.prototype.hasOwnProperty.call(options, 'page')) {
        page = options.page && Number(options.page) < 1 ? 1 : Number(options.page || 1);
        skip = (page - 1) * per_page;
    } else {
        page = 1;
        skip = 0;
    }

    if (!pagination) {
        page = 1;
    }

    let countPromise: Promise<any>;

    if (forceCountFn === true) {
        // Deprecated since starting from MongoDB Node.JS driver v3.1

        // Hack for mongo < v3.4
        if (Object.keys(collation).length > 0) {
            countPromise = this.count(query).collation(collation).exec();
        } else {
            countPromise = this.count(query).exec();
        }
    } else {
        if (useEstimatedCount === true) {
            countPromise = this.estimatedDocumentCount().exec();
        } else if (typeof useCustomCountFn === 'function') {
            // @ts-ignore
            countPromise = useCustomCountFn();
        } else {
            // Hack for mongo < v3.4
            if (Object.keys(collation).length > 0) {
                countPromise = this.countDocuments(query).collation(collation).exec();
            } else {
                countPromise = this.countDocuments(query).exec();
            }
        }
    }

    if (per_page) {
        const mQuery = this.find(query, projection, findOptions) as Query<any[], any>

        if (populate) {
            mQuery.populate(populate);
        }

        mQuery.select(select);
        mQuery.sort(sort);
        mQuery.lean(lean);

        if (read && read.pref) {
            /**
             * Determines the MongoDB nodes from which to read.
             * @param read.pref one of the listed preference options or aliases
             * @param read.tags optional tags for this query
             */
            mQuery.read(read.pref, read.tags);
        }

        // Hack for mongo < v3.4
        if (Object.keys(collation).length > 0) {
            mQuery.collation(collation as any);
        }

        if (pagination) {
            mQuery.skip(skip);
            mQuery.limit(per_page);
        }

        docsPromise = mQuery.exec();

        if (lean && leanWithId) {
            docsPromise = docsPromise.then((docs) => {
                docs.forEach((doc) => {
                    if (doc._id) {
                        doc.id = String(doc._id);
                        delete doc._id
                    }
                });
                return docs;
            });
        }
    }

    return Promise.all([countPromise, docsPromise])
        .then((values) => {
            const [count, docs] = values;
            const meta: PaginationResult<any>['meta'] & any = {};

            const pages = per_page > 0 ? Math.ceil(count / per_page) || 1 : null;

            meta['total'] = count;
            meta['current_page'] = Number(page) || 1;

            if (pagination) {
                meta['per_page'] = per_page;
                meta['last_page'] = pages;
    
                meta['prev_page'] = page > 1 ? page - 1 : null;
                meta['next_page'] = page < pages ? page + 1 : null;
            }

            if (per_page == 0) {
                meta['per_page'] = 0;
                meta['last_page'] = 1;
                meta['current_page'] = 1;
            }

            let result: PaginationResult<any> = {
                data: docs,
                meta,
            };

            return Promise.resolve(result);
        })
        .catch((error) => Promise.reject(error))
}

export default schema => schema.statics.paginate = paginate;
