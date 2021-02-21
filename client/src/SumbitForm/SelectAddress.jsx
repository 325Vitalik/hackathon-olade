import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getLatLng, geocodeByPlaceId } from "react-google-places-autocomplete";
import { config } from "../config";

const SelectAddress = ({
  lossLocation,
  onChangeCoordinates,
  onChangeLocation,
}) => {
  return (
    <GooglePlacesAutocomplete
      debounce={2000}
      selectProps={{
        value: lossLocation,
        onChange: (addressData) => {
          geocodeByPlaceId(addressData.value.place_id)
            .then((result) => getLatLng(result[0]))
            .then(onChangeCoordinates);
          onChangeLocation(addressData);
        },
      }}
      apiKey={config["api-key"]}
    />
  );
};

export default SelectAddress;
