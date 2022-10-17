import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { publisherOperations, publisherSelectors } from './../../ducks/publishers';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const PublisherForm = ({ id, publisher, getPublisherList, addPublisher, updatePublisher }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (publisher === undefined) {
            getPublisherList(id)
        }
    },[id, publisher, getPublisherList]);

    const initialValue = {
        name: '',
        description: '',
        creation_year: 0,
        image_url: '',
        city: '',
        street_name: '',
        street_number: '',
        apartment_number: '',
        official_link: ''
    }

    const publisherSchema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required().min(1),
        creation_year: Yup.number().required().min(1000).max(new Date().getFullYear()),
        image_url: Yup.string().matches(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.[a-z\u00a1-\uffff]{2,})(?::\d{2,5})?(?:\/\S*)?$/),
        city: Yup.string().required(),
        street_name: Yup.string().required(),
        street_number: Yup.string().required(),
        apartment_number: Yup.string(),
        official_link: Yup.string().required().url()
    });

    const handleEditSubmit = async (values) => {
        const response = await updatePublisher(values);
        if (response === 200) {
            alert('Successfully edited!')
            return navigate('/publishers');
        }
        alert('There was an error...')
    };

    const handleAddSubmit = async (values) => {
        const response = await addPublisher(values);
        if (response === 200) {
            alert('Successfully added!')
            return navigate('/publishers');
        }
        alert('There was an error...')
    }

    return (
        <div>
            <h1>Publisher Form</h1>
            <Formik
                initialValues={publisher ? publisher : initialValue}
                enableReinitialize={true}
                validationSchema={publisherSchema}
                onSubmit={(values) => publisher ? handleEditSubmit(values) : handleAddSubmit(values)}>
                <Form className="d-flex flex-column gap-1 container mt-5 align-items-start">
                    <label className='form-label'>Name</label>
                    <Field name='name' className='form-control'/>
                    <ErrorMessage name='name' className='text-danger' component='div'/>
                    <label className='form-label'>Description</label>
                    <Field as='textarea' type='textarea' name='description' className='form-control'/>
                    <ErrorMessage name='description' className='text-danger' component='div'/>
                    <label className='form-label'>Year Of Creation</label>
                    <Field name='creation_year' className='form-control'/>
                    <ErrorMessage name='creation_year' className='text-danger' component='div'/>
                    <label className='form-label'>Image URL</label>
                    <Field name='image_url' className='form-control'/>
                    <ErrorMessage name='image_url' className='text-danger' component='div'/>
                    <label className='form-label'>City</label>
                    <Field name='city' className='form-control'/>
                    <ErrorMessage name='city' className='text-danger' component='div'/>
                    <label className='form-label'>Street Name</label>
                    <Field name='street_name' className='form-control'/>
                    <ErrorMessage name='street_name' className='text-danger' component='div'/>
                    <label className='form-label'>Street Number</label>
                    <Field className='form-control' name='street_number' />
                    <ErrorMessage name='street_number' className='text-danger' component='div'/>
                    <label className='form-label'>Apartment Number</label>
                    <Field className='form-control' name='apartment_number' type='number' />
                    <ErrorMessage name='apartment_number' className='text-danger' component='div'/>
                    <label className='form-label'>Official Link</label>
                    <Field className='form-control' name='official_link' />
                    <ErrorMessage name='official_link' className='text-danger' component='div'/>
                    <button type='submit' className='btn btn-primary align-self-end mt-2'>Submit</button>
                </Form>
            </Formik>

        </div>
    )
};

const mapStateToProps = (state, { id }) => {
    return {
        publisher: publisherSelectors.getPublisherDetails(state, id),
        loading: state.games.loading
    }
}

const mapDispatchToProps = {
    getPublisherList: publisherOperations.getPublisherList,
    addPublisher: publisherOperations.addPublisher,
    updatePublisher: publisherOperations.updatePublisher
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherForm);