
export const GET_LOCATION_BEGIN= 'GET_LOCATION_BEGIN';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'GET_LOCATION_FAILURE';
export const GET_LOCATION = 'GET_LOCATION';

export const getLocationBegin = () => ({
  type: GET_LOCATION_BEGIN
});

export const getLocationSuccess = location => ({
  type: GET_LOCATION_SUCCESS,
  payload: { location }
});

export const getLocationError = error => ({
  type: GET_LOCATION_FAILURE,
  payload: { error }
});

export function getLocation() {
  return dispatch => {
    dispatch({
      type:GET_LOCATION_BEGIN,
      payload:true
    });

  function success(pos) {
    var crd = pos.coords;
    console.log(crd);
    dispatch({
      type:GET_LOCATION_SUCCESS,
      payload:crd
    });
  }

  function error(err) {
    dispatch({
      type:GET_LOCATION_FAILURE,
      payload:err
    });
  }

  navigator.geolocation.getCurrentPosition(success, error);

    }
  }
