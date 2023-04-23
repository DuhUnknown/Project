import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchWrapper } from "../services/fetchWrapper";
interface PoiInterface {
  id: number;
  name: string;
  description: string;
  url: string;
  CityId: number;
}

function POI() {
  const [open, setOpen] = React.useState(false);
  const [poi, setPoi] = useState<PoiInterface[]>([]);
  const [poiName, setPoiName] = useState("");
  const [poiDescription, setPoiDescription] = useState("");
  const { id } = useParams<{ id: string }>();
  const [poid, setPoid] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [url, setUrl] = useState("");

  const getPOI = () => {
    if (!id) {
      console.log("no POI found");
    } else {
      fetchWrapper.getPOI(parseInt(id)).then((data) => {
        setPoi(data);
      });
    }
  };

  useEffect(() => {
    getPOI();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setEditMode(false);
    setOpen(true);
  };
  const handleEdit = (editValue: PoiInterface, id: number) => {
    setEditMode(true);
    setOpen(true);
    setPoid(id);
    setPoiName(editValue.name);
    setPoiDescription(editValue.description);
    setUrl(editValue.url);
  };
  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    if (!poi || !id) {
      console.log("poi or id not found");
      return;
    }
    poi.map((poi) => {
      setPoid(poi.id);
    });
    setOpen(false);
    if (!editMode) {
      await fetchWrapper.createPOI(parseInt(id), {
        name: poiName,
        description: poiDescription,
        CityId: parseInt(id),
        id: poid,
        url: url,
      });
    } else {
      await fetchWrapper.editPOI(parseInt(id), {
        name: poiName,
        description: poiDescription,
        CityId: parseInt(id),
        id: poid,
        url: url,
      });
      console.log(url);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a city</DialogContentText>
          <form onSubmit={(event) => handleSubmit(event)}>
            <TextField
              autoFocus
              margin="dense"
              id="poiname"
              label="Poi Name"
              type="text"
              fullWidth
              variant="standard"
              value={poiName}
              onChange={(event) => {
                setPoiName(event.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="poiDescription"
              label="Poi Description"
              type="text"
              fullWidth
              variant="standard"
              value={poiDescription}
              onChange={(event) => {
                setPoiDescription(event.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="poiUrl"
              label="Url"
              type="text"
              fullWidth
              variant="standard"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                console.log(url);
              }}
            />

            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={handleOpen}>Add Poi</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>CityId</TableCell>
            <TableCell>Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {poi.map((poi) => (
            <TableRow key={poi.id}>
              <TableCell>
                {poi.name}
                <Button
                  onClick={() => {
                    handleEdit(poi, poi.id);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>{poi.description}</TableCell>
              <TableCell>{poi.CityId}</TableCell>
              <TableCell>{poi.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default POI;
