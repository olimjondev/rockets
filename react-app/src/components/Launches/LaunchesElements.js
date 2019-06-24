import React from 'react';

export const Title = ({title, success}) =>{
    return(
        <h2 className="header">
            {title}
            {!success ? <span> - <span className="failed">Failed Mission</span></span> : null}
        </h2>
    );
};

export const LaunchDetails = ({date, site}) =>{
    return(
        <div className="meta">
            <p><b>{date.day}th {date.month} {date.year}</b> at <b>{date.time}</b> from <b>{site.full_name}</b></p>
        </div>
    );
};

export const Links = props =>{
    const {
        article_link,
        presskit,
        reddit_campaign,
        reddit_launch,
        reddit_media,
        reddit_recovery,
        video_link
    } = props.links;
    return(
        <div className="extra">       
            {reddit_campaign ? <a href={reddit_campaign} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Reddit Campaign</a> : null}
            {reddit_launch ? <a href={reddit_launch} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Reddit Launch</a> : null}
            {reddit_media ? <a href={reddit_media} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Reddit Media</a> : null}
            {presskit ? <a href={presskit} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Press Kit</a> : null}
            {article_link ? <a href={article_link} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Article</a> : null}
            {video_link ? <a href={video_link} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Watch Video</a> : null}
            {reddit_recovery ? <a href={reddit_recovery} rel="noopener noreferrer" target="_blank" className="ui gray basic button">Reddit Recovery</a> : null}
        </div>
    );
};

export const Placeholder = () =>{
    return(
        <div className="ui fluid placeholder">
            <div className="image header">
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="paragraph">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}