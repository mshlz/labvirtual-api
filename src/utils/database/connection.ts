import { connect } from "mongoose"

export const connectDB = async (connection_url: string) => {
    await connect(connection_url)
}