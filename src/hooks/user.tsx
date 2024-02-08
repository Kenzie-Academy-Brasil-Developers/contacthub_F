import { useContext } from "react"
import { UserContext } from "../providers/userProvider"

export const authUser = () => {
    const userContext = useContext(UserContext)
    return userContext
}