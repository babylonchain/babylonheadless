import Image from "next/image";
export default function CustomImage ( {item} ){
    
    const url = item?.mediaItemUrl;
   var imgURl = /^https?:\/\/(.+\/)+.+(\.(svg))$/i;
//    console.warn('test', item?.mediaDetails?.width);
//    return('test');
    if(url.match(imgURl)){
        // return url.match(p)[0];
        return <img src={item?.url} alt={item?.alt ? item?.alt : item?.title } />;
                                  
    }
    return <Image src={item?.mediaItemUrl} width={item?.mediaDetails?.width} height={item?.mediaDetails?.height} alt={item.alt ? item.alt : item.title }/>;
}