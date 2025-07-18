const text = "Agregar al Carrito";
const productsData=[
    {
        id:1, img:"./assets/img/img1.png", name:"Mesa Oval Estilo Luis XV" , Category:"mesa", price:"300",txt: text,  
    },
    {
        id:2, img:"./assets/img/img2.png", name:"Mesa Oval Estilo Art Deco", Category:"mesa", price:"400",txt: text,  
    },
    {
        id:3, img:"./assets/img/img3.png", name:"Mesa de forma circular", Category:"mesa", price:"1000",txt: text,  
    },
    {
        id:4, img:"./assets/img/img4.jpg", name:"Cómoda Portuguesa S. XVIII", Category:"comoda", price:"800",txt: text,  
    },
    {
        id:5, img:"./assets/img/img5.jpg", name:"Mesa Colonial Antigua", Category:"mesa", price:"500",txt: text,  
    },
    {
        id:6, img:"./assets/img/img6.jpg", name:"Antigua Mesa Italiana siglo XVII", Category:"mesa", price:"500",txt: text,  
    },
    {
        id:7, img:"./assets/img/img7.jpg", name:"Cómoda Secretarie Siglo XVIII", Category:"comoda", price:"1200",txt: text,  
    },
    {
        id:8, img:"./assets/img/img8.jpg", name:"Cómoda Francesa Estilo Transición", Category:"comoda", price:"850",txt: text,  
    },
    {
        id:9, img:"./assets/img/img9.jpg", name:"Sofá Chesterfield Estilo Victoriana", Category:"sofa", price:"1400",txt: text,  
    },
    {
        id:10, img:"./assets/img/img10.jpg", name:"Escritorio Estilo Ingles Eduardino ", Category:"escritorio", price:"2000",txt: text,  
    },
    {
        id:11, img:"./assets/img/img11.jpg", name:"Sillas Lusa Siglo XVI", Category:"silla", price:"500",txt: text,  
    },
    {
        id:12, img:"./assets/img/img12.jpg", name:"Sillones Franceses Estilo Regence", Category:"sillones", price:"800",txt: text,  
    },
    {
        id:13, img:"./assets/img/img13.jpg", name:"Sillones Pimonteses siglo XVII", Category:"sillones", price:"400",txt: text,  
    },
    {
        id:14, img:"./assets/img/img14.jpg", name:"Sillones Ingleses Estilo Windsor", Category:"sillones", price:"400",txt: text,  
    },
    {
        id:15, img:"./assets/img/img15.jpg", name:"Mesa Oval Estilo Frances Luis XV", Category:"mesa", price:"780",txt: text,  
    },
    {
        id:16, img:"./assets/img/img16.jpg", name:"Antiguos Sillones Luis XVI", Category:"sillones", price:"1000",txt: text,  
    },
    {
        id:17, img:"./assets/img/img17.jpg", name:"Escritorio Estilo Frances Luis XVI", Category:"escritorio", price:"580",txt: text,  
    },
    {
        id:18, img:"./assets/img/img18.jpg", name:"Antiguas Sillas Victoriana para jardín", Category:"sillas", price:"350",txt: text,  
    },
    {
        id:19, img:"./assets/img/img19.jpg", name:"Mesa Estilo Frances Luis XV para centro", Category:"mesa", price:"450",txt: text,  
    },
    {
        id:20, img:"./assets/img/img20.jpg", name:"Sillas Federales Americanas", Category:"sillas", price:"400",txt: text,  
    },
    {
        id:21, img:"./assets/img/img21.jpg", name:"Sillón Marquise Estilo Frances Luis XVI", Category:"sillones", price:"280",txt: text,  
    },
    {
        id:22, img:"./assets/img/img22.jpg", name:"Sofá Frances de Estilo Imperio", Category:"sofa", price:"250",txt: text,  
    },
    {
        id:23, img:"./assets/img/img23.jpg", name:"Chaise Longue Estilo Inglés", Category:"sillones", price:"250",txt: text,  
    },
    {
        id:24, img:"./assets/img/img24.jpg", name:"Sopera de Plata Francesa", Category:"objetos", price:"130",txt: text,  
    },
    {
        id:25, img:"./assets/img/img25.jpg", name:"Pava Colonial siglo XVI", Category:"objetos", price:"350",txt: text,  
    },
    // {
        // id:21, img:"./assets/img/img21.jpg", name:"Sillón Marquise Estilo Frances Luis XVI", Category:"sillones", price:"250"
    // },
]


const chunkProducts= (size)=>{
    let productList=[]

    for(let i= 0; i< productsData.length; i+=size){
        productList.push(productsData.slice(i, i+size))
    }
    return productList;
} 


const PRODUCTS_SIZE=6;

const appState={
    products:chunkProducts(PRODUCTS_SIZE),
    productLimit: chunkProducts(PRODUCTS_SIZE).length,
    currentProductIndex:0,
    activeFilter: null

}




