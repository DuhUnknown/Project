import { useEffect, useState } from "react";
import { fetchWrapper } from "../services/fetchWrapper";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  createTheme,
} from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "styled-components";
import { DeleteForever } from "@mui/icons-material";
import styled from "styled-components";

interface CityInterface {
  id: number;
  name: string;
  description: string;
  url: string;
  population: number;
}
const Cities = () => {
  const [id, setId] = useState(0);

  const [cities, setCities] = useState<CityInterface[]>([]);
  const [open, setOpen] = React.useState(false);
  const [cityName, setCityName] = useState("");
  const [cityDescription, setCityDescription] = useState("");
  const [population, setPopulation] = useState("");
  const [url, setUrl] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (event: React.BaseSyntheticEvent, id: number) => {
    event.preventDefault();
    console.log(`City Name: ${cityName}`);
    console.log(`City Description: ${cityDescription}`);
    console.log(`Population: ${population}`);
    if (editMode) {
      fetchWrapper.edit({
        id: id,
        name: cityName,
        description: cityDescription,
        Pop: parseInt(population),
        url: url,
      });
    } else {
      fetchWrapper.create({
        name: cityName,
        description: cityDescription,
        Pop: parseInt(population),
        url: url,
      });
    }

    setOpen(false);
  };

  const getCities = async () => {
    await fetchWrapper.get("/cities").then((data) => {
      setCities(data);
    });
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleClickOpen = () => {
    setEditMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = (editValue: CityInterface) => {
    setEditMode(true);
    setOpen(true);
    setCityName(editValue.name);
    setId(editValue.id);
    setCityDescription(editValue.description);
    setPopulation(editValue.population.toString());
    setUrl(editValue.url);
  };
  const handleDelete = (id: number) => {
    fetchWrapper.deleteCity(id);
  };
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#80606b",
      },
    },
  });
  const Cities = styled.div`
    background-color: #f2f2f2;
    display: flex;
    flex: 1;
  `;

  return (
    <ThemeProvider theme={theme}>
      <div className="Cities">
        <h1>City table</h1>
        <Button startIcon={<AddIcon />} onClick={handleClickOpen}></Button>{" "}
        <Dialog open={open} onClose={handleClose}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <DialogTitle>City Dialog</DialogTitle>
                <DialogContent>
                  <DialogContentText>Add a city</DialogContentText>
                  <form onSubmit={(event) => handleSubmit(event, id)}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="cityname"
                      label="City Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={cityName}
                      onChange={(event) => {
                        setCityName(event.target.value);
                      }}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="citydescription"
                      label="City Description"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={cityDescription}
                      onChange={(event) =>
                        setCityDescription(event.target.value)
                      }
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="population"
                      label="Population"
                      type="number"
                      fullWidth
                      variant="standard"
                      value={population}
                      onChange={(event) => setPopulation(event.target.value)}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="population"
                      label="Url"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={url}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog>
        <motion.div variants={tableVariants} initial="hidden" animate="visible">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Url</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city) => (
                <motion.tr
                  key={city.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.td variants={cellVariants}>
                    <Button
                      sx={{
                        color: "primary.contrastText",
                        backgroundColor: "#80606b",
                      }}
                      component={Link}
                      to={`/poi/${city.id}`}
                    >
                      {city.name}
                    </Button>
                    <Button
                      sx={{ color: "#80606b" }}
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick(city)}
                    ></Button>
                    <Button
                      sx={{ color: "#80606b" }}
                      startIcon={<DeleteForever />}
                      onClick={() => handleDelete(city.id)}
                    ></Button>
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {city.description}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    {city.population}
                  </motion.td>
                  <motion.td variants={cellVariants}>
                    <Button
                      sx={{
                        color: "primary.contrastText",
                        backgroundColor: "#80606b",
                      }}
                      component={Link}
                      to={city.url}
                    >
                      Google Maps Link
                    </Button>
                  </motion.td>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default Cities;
