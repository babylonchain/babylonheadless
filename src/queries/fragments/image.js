const ImageFragment = `
    fragment ImageFragment on MediaItem {
        altText
        title(format: RENDERED)
        mediaItemUrl
        mediaDetails {
            width
            height
        }
    }
`;

export default ImageFragment;
