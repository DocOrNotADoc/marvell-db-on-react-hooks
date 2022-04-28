import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";

import useMarvelService from '../../../services/MarvelService';
import AppBanner from "../../appBanner/AppBanner";
import setContent from '../../../utils/setContent';
import './singlePage.scss';

const SingleComicPage = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [id])

    const updateComic = () => {
        clearError();
        getComic(id)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicLoaded = (data) => {
        setData(data);
    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {setContent(process, View, data)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <div className="single-item">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                    />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-item__comic-img"/>
            <div className="single-item__info">
                <h2 className="single-item__name">{title}</h2>
                <p className="single-item__descr">{description}</p>
                <p className="single-item__descr">{pageCount}</p>
                <p className="single-item__descr">Language: {language}</p>
                <div className="single-item__price">{price}</div>
            </div>
            <Link to="/comics" className="single-item__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;