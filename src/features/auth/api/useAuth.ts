"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

async function verifyPasswordResetToken({ token }: { token: string }) {
  const res = await fetch("/api/auth/verify-token", {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  if (data.status === 200) {
    return data;
  }

  throw new Error(data.message);
}

async function resetPassword({
  password,
  confirmPassword,
  email,
  token,
}: {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}) {
  const res = await fetch(`/api/auth/reset-password`, {
    method: "PATCH",
    body: JSON.stringify({ password, confirmPassword, token, email }),
  });
  const data = await res.json();
  if (data.status === 200) {
    return data;
  }

  throw new Error(data.message);
}

export const useAuth = () => {
  const router = useRouter();
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

  const verifyPasswordResetTokenMutation = useMutation({
    mutationFn: verifyPasswordResetToken,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
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

    verifyPasswordResetToken: verifyPasswordResetTokenMutation.mutate,
    verifyPasswordResetTokenPending: verifyPasswordResetTokenMutation.isPending,
    verifyPasswordResetTokenSuccess: verifyPasswordResetTokenMutation.isSuccess,
    verifyPasswordResetTokenError: verifyPasswordResetTokenMutation.error,
    verifyPasswordResetTokenData: verifyPasswordResetTokenMutation.data,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordPending: resetPasswordMutation.isPending,
  };
};
