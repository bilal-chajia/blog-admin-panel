import React, { useState } from 'react';

const AvatarContext = React.createContext({});

const Avatar = ({ children, size = '48x48', ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => setImageLoaded(true);

    return (
        <AvatarContext.Provider value={{ imageLoaded, handleImageLoad }}>
            <figure className={`image is-${size}`} {...props}>
                {children}
            </figure>
        </AvatarContext.Provider>
    );
};

const AvatarImage = ({ src, alt, ...props }) => {
    const { handleImageLoad } = React.useContext(AvatarContext);
    return (
        <img
            src={src}
            alt={alt}
            className="is-rounded"
            onLoad={handleImageLoad}
            {...props}
        />
    );
};

const AvatarFallback = ({ children, ...props }) => {
    const { imageLoaded } = React.useContext(AvatarContext);

    if (imageLoaded) {
        return null;
    }

    return (
        <div
            className="is-rounded"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                color: '#7a7a7a'
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export { Avatar, AvatarImage, AvatarFallback };
