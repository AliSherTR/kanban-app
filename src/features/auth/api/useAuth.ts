import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface signUpSchema {
  username: string;
  email: string;
  password: string;
}
interface loginSchema {
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

async function loginUser({ email, password }: loginSchema) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.status === 200) {
    return data;
  }

  throw new Error(data.message);
}

async function logoutUser() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  const data = await res.json();
  if (data.status === 200) {
    return data;
  }

  throw new Error(data.message);
}

async function forgotPassword({ email }: { email: string }) {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (data.status === 200) {
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

  const loginMutation = useMutation({
    mutationFn: loginUser,
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

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
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

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
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

    login: loginMutation.mutate,
    loggingIn: loginMutation.isPending,
    loginSuccess: loginMutation.isSuccess,

    logout: logoutMutation.mutate,
    logoutPending: logoutMutation.isPending,
    logoutSucces: logoutMutation.isSuccess,

    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordPending: forgotPasswordMutation.isPending,
  };
};
