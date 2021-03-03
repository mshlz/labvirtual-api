import { connect, connection } from "mongoose"

export const connectDB = async (connection_url: string) => {
    await connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
}