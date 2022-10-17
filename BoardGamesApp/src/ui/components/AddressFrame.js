const AddressFrame = ({ street_name, street_number, apartment_number, city }) => {
    return (
        <>
            {apartment_number ?
                <iframe
                    title='address'
                    className='address rounded align-self-center'
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCVnkENtD2IvAlqHNNh_vK6LkMI285DEFI&q=${street_name}+${street_number},${city}&zoom=12'`} allowFullScreen>
                </iframe>
                :
                <iframe
                    title='address'
                    className='address rounded align-self-center'
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCVnkENtD2IvAlqHNNh_vK6LkMI285DEFI&q=${street_name}+${street_number}/${apartment_number},${city}&zoom=12'`} allowFullScreen>
                </iframe>
            }
        </>

    )
};

export default AddressFrame;