import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { gameOperations, gameSelectors } from './../../ducks/games';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { publisherOperations } from './../../ducks/publishers';
import { useKeycloak } from "@react-keycloak/web";

const GameForm = ({ id, game, categories, publishers, getGameList, addGame, updateGame, getPublisherList }) => {
    const navigate = useNavigate()
    const { keycloak } = useKeycloak()

    useEffect(() => {
        if (game === undefined) {
            getGameList()
        }
        if (publishers === undefined) {
            getPublisherList()
        }
    },[id, game, publishers, getGameList, getPublisherList]);

    const initialValue = {
        name: '',
        publisher: '',
        year_published: 0,
        min_players: 0,
        max_players: 0,
        min_age: 0,
        min_time: 0,
        max_time: 0,
        short_description: '',
        description: '',
        image_url: '',
        price: 0,
        category: '',
    }

    const gameSchema = Yup.object().shape({
        name: Yup.string().required(),
        year_published: Yup.number().required().min(1000).max(new Date().getFullYear()),
        min_players: Yup.number().required().min(1),
        max_players: Yup.number().required().min(Yup.ref('min_players')),
        min_age: Yup.number().required().min(3),
        min_time: Yup.number().required().min(1),
        max_time: Yup.number().required().min(Yup.ref('min_time')),
        short_description: Yup.string().max(150),
        description: Yup.string().required().min(1),
        image_url: Yup.string().matches(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.[a-z\u00a1-\uffff]{2,})(?::\d{2,5})?(?:\/\S*)?$/),
        price: Yup.number().required().min(0.01),
        publisher: Yup.string().required(),
        category: Yup.string().required()
    });

    const handleEditSubmit = async (values) => {
        const response = await updateGame(values);
        if (response === 200) {
            alert('Successfully edited!')
            return navigate('/games');
        }
        alert('There was an error...')
    };

    const handleAddSubmit = async (values) => {
        const response = await addGame(values);
        if (response === 200) {
            alert('Successfully added!')
            return navigate('/games');
        }
        alert('There was an error...')
    }

    return (
        <div>
            <h1>Game Form</h1>
            <Formik
                initialValues={game ? game : initialValue}
                enableReinitialize={true}
                validationSchema={gameSchema}
                onSubmit={(values) => game ? handleEditSubmit(values) : handleAddSubmit(values)}>
                <Form className="d-flex flex-column gap-1 container mt-5 align-items-start">
                    <label className='form-label'>Name</label>
                    <Field name='name' className='form-control'/>
                    <ErrorMessage name='name' className='text-danger' component='div'/>
                    <label className='form-label'>Publisher</label>
                    <Field name='publisher' as='select' className='form-control'>
                        <option value=''>Select director</option>
                        {publishers && publishers.map((publisher, index) =>
                            <option value={publisher._id} key={index}>{publisher.name}</option>)}

                    </Field>
                    <ErrorMessage name='publisher' className='text-danger' component='div'/>
                    <label className='form-label'>Year Published</label>
                    <Field name='year_published' className='form-control'/>
                    <ErrorMessage name='year_published' className='text-danger' component='div'/>
                    <label className='form-label'>Min Players</label>
                    <Field name='min_players' className='form-control'/>
                    <ErrorMessage name='min_players' className='text-danger' component='div'/>
                    <label className='form-label'>Max Players</label>
                    <Field name='max_players' className='form-control'/>
                    <ErrorMessage name='max_players' className='text-danger' component='div'/>
                    <label className='form-label'>Min Age</label>
                    <Field name='min_age' className='form-control'/>
                    <ErrorMessage name='min_age' className='text-danger' component='div'/>
                    <label className='form-label'>Min Time</label>
                    <Field name='min_time' className='form-control'/>
                    <ErrorMessage name='min_time' className='text-danger' component='div'/>
                    <label className='form-label'>Max Time</label>
                    <Field name='max_time' className='form-control'/>
                    <ErrorMessage name='max_time' className='text-danger' component='div'/>
                    <label className='form-label'>Short Description</label>
                    <Field name='short_description' className='form-control'/>
                    <ErrorMessage name='short_description' className='text-danger' component='div'/>
                    <label className='form-label'>Description</label>
                    <Field as='textarea' type='textarea' name='description' className='form-control'/>
                    <ErrorMessage name='description' className='text-danger' component='div'/>
                    <label className='form-label'>Image URL</label>
                    <Field name='image_url' className='form-control'/>
                    <ErrorMessage name='image_url' className='text-danger' component='div'/>
                    <label className='form-label'>Price</label>
                    <Field name='price' className='form-control'/>
                    <ErrorMessage name='price' className='text-danger' component='div'/>
                    <label className='form-label'>Category</label>
                    <Field placeholder='Select or type a category' autoComplete="off" as='input' list='categories' className='form-control' name='category' id='category' />
                    <Field as='datalist' id='categories'>
                        <option value=''/>
                        {categories && categories.map((category, index) =>
                            <option value={category} key={index} />)}
                    </Field>
                    <ErrorMessage name='category' className='text-danger' component='div'/>
                    <button type='submit' className='btn btn-primary align-self-end mt-2'>Submit</button>
                </Form>
            </Formik>

        </div>
    )
};

const mapStateToProps = (state, { id }) => {
    return {
        game: gameSelectors.getGameDetails(state, id),
        loading: state.games.loading,
        categories: gameSelectors.getGameCategories(state),
        publishers: state.publishers.publishers
    }
}

const mapDispatchToProps = {
    getGameList: gameOperations.getGameList,
    addGame: gameOperations.addGame,
    updateGame: gameOperations.updateGame,
    getPublisherList: publisherOperations.getPublisherList
}

export default connect(mapStateToProps, mapDispatchToProps)(GameForm);