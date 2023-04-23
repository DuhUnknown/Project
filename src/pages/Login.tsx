import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { AccountBox } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25ch",
    borderColor: "#80606b",
  },
  "& .MuiButton-root": {
    margin: theme.spacing(2),
    backgroundColor: "#80606b",
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "#80606b",
    },
  },
}));

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:5000/api/users/login?user=${user}&password=${password}`
    );
    console.log(response);

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      onSuccess();
    } else if (response.status === 404) {
      alert(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="Center">
      <LoginForm onSubmit={handleSubmit}>
        <Typography variant="h5">Login</Typography>

        <TextField
          label={
            <Typography
              sx={{
                background: "linear-gradient(to right, #9C27B0, #E91E63)",
                WebkitBackgroundClip: "text",
                animation: "$gradient 8s ease-in-out infinite",
                color: "#80606b",
                display: "flex",
                alignItems: "center",
                paddingLeft: "0.5rem",
              }}
            >
              User
            </Typography>
          }
          value={user}
          onChange={(e) => setUser(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBox sx={{ color: "#80606b" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            marginTop: "1rem",
            "& label": {
              color: "#80606b",
            },
            "& .MuiInputBase-input": {
              color: "#80606b",
              background: "linear-gradient(to right, #9C27B0, #E91E63)",
              WebkitBackgroundClip: "text",
              animation: "$gradient 10s ease-in-out infinite",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#80606b",
              },
              "&:hover fieldset": {
                borderColor: "#80606b",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#E91E63",
              },
            },
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon sx={{ color: "#80606b" }} />
              </InputAdornment>
            ),
          }}
          label={
            <Typography
              sx={{
                background: "linear-gradient(to right, #9C27B0, #E91E63)",
                WebkitBackgroundClip: "text",
                animation: "$gradient 8s ease-in-out infinite",
                color: "#80606b",
                display: "flex",
                alignItems: "center",
                paddingLeft: "0.5rem",
              }}
            >
              Password
            </Typography>
          }
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{
            marginTop: "1rem",
            "& label": {
              color: "#80606b",
            },
            "& .MuiInputBase-input": {
              color: "#80606b",
              background: "linear-gradient(to right, #9C27B0, #E91E63)",
              WebkitBackgroundClip: "text",
              animation: "$gradient 10s ease-in-out infinite",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#80606b",
              },
              "&:hover fieldset": {
                borderColor: "#80606b",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#E91E63",
              },
            },
          }}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: "1rem" }}>
          Submit
        </Button>
        <style>
          {`
          @keyframes gradient {
            0% { background-position: 0 0; }
            50% { background-position: 100% 0; }
            100% { background-position: 0 0; }
          }
        `}
        </style>
      </LoginForm>
    </div>
  );
};

export default Login;
