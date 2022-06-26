export type RoleType = 'COMMON' | 'STUDENT' | 'TEACHER' | 'ADMIN'

export class Role {
    constructor(public name: string, public level: number, public type: RoleType = 'COMMON') { }

    static STUDENT = new Role('STUDENT', 10, 'STUDENT')
    static TEACHER = new Role('TEACHER', 50, 'TEACHER')
    static ADMIN = new Role('ADMIN', 100, 'ADMIN')
    static SYS = new Role('SYS', 1000, 'ADMIN')
}