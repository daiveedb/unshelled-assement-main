import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const createObject = async ({ payload }: { payload: any }) => {
  const response = await axios.post(`api/objects/`, payload);
  return response.data;
};

export const useCreateObject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createObject,
    mutationKey: ["create-object"],
    onSuccess: () => {
      toast.success("Object created successfully");
      queryClient.invalidateQueries({
        queryKey: ["objects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["object"],
      });
    },
    // onError: (error) => toast.error(error.message),
  });
};
