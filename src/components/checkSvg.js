import Image from "next/image";
export default function CheckSvg ( {item} ){
    const url = item?.url;
   var imgURl = /^https?:\/\/(.+\/)+.+(\.(svg))$/i;
//    console.warn('test', url);
//    return('test');
    if(url.match(imgURl)){
        // return url.match(p)[0];
        return <img src={item.url} alt={item.alt ? item.alt : item.title } />;
                                  
    }
    return <Image src={item.url} width={item?.width} height={item?.height} alt={item.alt ? item.alt : item.title }/>;
}