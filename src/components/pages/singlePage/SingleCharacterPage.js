import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from "../../appBanner/AppBanner";
import './singlePage.scss';

const SingleCharacterPage = () => {
    const {id} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [id])

    const updateChar = () => {
        clearError();
        getCharacter(id)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail } = char;

    return (
        <div className="single-item">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character page`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-item__char-img"/>

            <div className="single-item__info">
                <h2 className="single-item__name">{name}</h2>
                <p className="single-item__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage;