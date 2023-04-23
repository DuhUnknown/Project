
interface City {
  name: string;
  description: string;
  Pop: number;
  url: string;
}
interface changeCity {
  id?:number
  name: string;
  description: string;
  Pop: number;
  url: string;
}
interface PoiInterface {
  name: string;
  description: string;
  CityId:number
  id:number
  url:string
}

const getPOI = (cityid:number) => {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`http://127.0.0.1:5000/api/cities/${cityid}/pointsofinterest`, requestOptions).then(handleResponse);
};
const createPOI = async (cityid:number,pooi:PoiInterface) =>{
  const response = await fetch(`http://127.0.0.1:5000/api/cities/${cityid}/pointsofinterest/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pooi),
  });
  
  if (response.ok) {
    const createdCity = await response.json();
    console.log(createdCity);
  } else {
    console.log('Failed to create poi');
  }
}
const deleteCity = async (cityid:number) =>{
  const response = await fetch(`http://127.0.0.1:5000/api/cities/${cityid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (response.ok) {
    const deleted = await response.json();
    console.log(deleted);
  } else {
    console.log('Failed to delete city');
  }
}
const editPOI = async (cityid:number,pooi:PoiInterface) =>{
  const response = await fetch(`http://127.0.0.1:5000/api/cities/${cityid}/pointsofinterest/${pooi.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pooi),
  });
  
  if (response.ok) {
    const editedPOI = await response.json();
    console.log(editedPOI);
  } else {
    console.log('Failed to create poi');
  }
  console.log(JSON.stringify(pooi))
}
const createCity = async (city: City) => {
  const response = await fetch('http://127.0.0.1:5000/api/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(city),
  });
  
  if (response.ok) {
    const createdCity = await response.json();
    console.log(createdCity);
  } else {
    console.log('Failed to create city');
  }
};
const editCity = async (city: changeCity) => {
  const response = await fetch(`http://127.0.0.1:5000/api/cities/${city.id}/modify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(city),
  });
  
  if (response.ok) {
    const editCity = await response.json();
    console.log(editCity);
  } else {
    console.log('Failed to edit city');
  }
};
//GET method - Retrieve data
const getData = (api: string) => {
  const requestOptions = {
    method: "GET",
  };
  return fetch('http://127.0.0.1:5000/api/cities', requestOptions).then(handleResponse);
};


// Response handler helper function
const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    return data;
  });
};

export const fetchWrapper = {
  get: getData,
  create:createCity,
  edit:editCity,
  getPOI:getPOI,
  createPOI:createPOI,
  editPOI:editPOI,
  deleteCity:deleteCity
};
