
import { QueryClient, useQueryClient } from "@tanstack/react-query";


export const useGlobalHooks = () => {
    const queryClient = useQueryClient()

    return {
        queryClient
    }
}
