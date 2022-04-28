import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

import useMarvelService from '../../../services/MarvelService';
import AppBanner from "../../appBanner/AppBanner";
import setContent from '../../../utils/setContent';
import './singlePage.scss';

const SingleCharacterPage = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [id])

    const updateChar = () => {
        clearError();
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, View, data)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail } = data;

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