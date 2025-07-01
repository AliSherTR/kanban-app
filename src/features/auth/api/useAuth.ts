import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface signUpSchema {
  username: string;
  email: string;
  password: string;
}
async function signUpUser({ username, email, password }: signUpSchema) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (data.status === 201) {
    return data;
  }

  throw new Error(data.message);
}

export const useAuth = () => {
  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });

  return {
    signup: signUpMutation.mutate,
    signUpSuccess: signUpMutation.isSuccess,
    signUpPending: signUpMutation.isPending,
  };
};
