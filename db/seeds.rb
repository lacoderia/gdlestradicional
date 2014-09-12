# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Util.create(next_min_id: '')

fresca = Location.create(name:'La Fresca', description:'Desayuna', lat:20.701426, long:-103.377358)
anitali = Location.create(name:'Anita Li', description:'Come', lat:20.6717973, long:-103.3917332)
teteria = Location.create(name:'La Tetería', description:'Pasa la tarde', lat:20.6718647, long:-103.362534)
lula = Location.create(name:'Lula Bistro', description:'Cena', lat:20.6699302, long:-103.3910036)
clarum = Location.create(name:'Hotel Clarum', description:'Pre', lat:20.6645024, long:-103.4022445)
ilatina = Location.create(name:'La I Latina', description:'De fiesta', lat:20.6719689, long:-103.3923085)
tortatono = Location.create(name:'Tortas Toño', description:'Recupérate', lat:20.696403, long:-103.390355)
kukurucho = Location.create(name:'Los Kukuruchos', description:'Descubre', lat:20.6586665, long:-103.3983908)
chapalita = Location.create(name:'La Glorieta Chapalita', description:'Captura un momento', lat:20.6663616, long:-103.4026873)
cafebarra= Location.create(name:'Café Barra', description:'Desayuna', lat:20.6985765, long:-103.3825064)
cortez = Location.create(name:'Cortez', description:'Come', lat:20.7003178, long:-103.3754092)
saopaulo = Location.create(name:'Punto Sao Paulo', description:'Pasa la tarde', lat:20.7023301, long:-103.3763695)
olio = Location.create(name:'Olio Bistro', description:'Cena', lat:20.7019898, long:-103.3763877)
lamar = Location.create(name:'La Mar', description:'Pre', lat:20.6908082, long:-103.3867013)
figueroa = Location.create(name:'La Figueroa', description:'De fiesta', lat:20.6922206, long:-103.3864861)
reddy = Location.create(name:'Reddy Sandwiches', description:'Botanea', lat:20.693446, long:-103.384015)
colomos = Location.create(name:'Los Colomos', description:'Cuídate', lat:20.707669, long:-103.391053)
mirilla = Location.create(name:'La Mirilla', description:'Descubre', lat:20.6997098, long:-103.3826046)
montevideo = Location.create(name:'Esculturas Montevideo', description:'Captura un momento', lat:20.6960182, long:-103.3909996)
antigua = Location.create(name:'Cafetería La Antigua', description:'Desayuna', lat:20.6723494, long:-103.36151)
pigpearl = Location.create(name:"Pig's Pearls", description:'Come', lat:20.677361, long:-103.365212)
blacksheep = Location.create(name:'Black Sheep', description:'Pasa la tarde', lat:20.6733566, long:-103.3657656)
pekopeko = Location.create(name:'Peko Peko', description:'Cena', lat:20.6758526, long:-103.3614779)
romea = Location.create(name:'Romea', description:'Pre', lat:20.676074, long:-103.365042)
elrey = Location.create(name:'El Rey', description:'De fiesta', lat:20.6784022, long:-103.3725071)
elchacal = Location.create(name:'El Chacal', description:'De fiesta', lat:20.677987, long:-103.3726)
jeronimo = Location.create(name:'Jerónimo', description:'Recupérate', lat:20.6760712, long:-103.3732004)
lamexico = Location.create(name:'Cantina La México', description:'Botanea', lat:20.6797397, long:-103.3855383)
via = Location.create(name:'Via Recreactiva La Minerva', description:'Cuídate', lat:20.6744507, long:-103.3852393)
dieresis = Location.create(name:'Galería Diéresis', description:'Desayuna', lat:20.6772837, long:-103.3638026)
corredorchap = Location.create(name:'Corredor Cultural Chapultepec', description:'Captura un momento', lat:20.6710344, long:-103.3685911)
coffeehouse = Location.create(name:'Coffee House', description:'Desayuna', lat:20.67905, long:-103.37748)
alcalde = Location.create(name:'Alcalde', description:'Come', lat:20.6795097, long:-103.3897753)
maz = Location.create(name:'MAZ', description:'Pasar la tarde', lat:20.7206165, long:-103.3899445)
travesia = Location.create(name:'Travesía Cuatro', description:'Pasar la tarde', lat:20.641961, long:-103.319833)
cabana = Location.create(name:'Instituto Cultural Cabañas', description:'Pasar la tarde', lat:20.6767962, long:-103.3380032)
hueso = Location.create(name:'Hueso', description:'Cena', lat:20.669546, long:-103.369836)
demetria = Location.create(name:'Hotel Demetria', description:'Pre', lat:20.6721988, long:-103.3731294)
candela = Location.create(name:'Café Candela', description:'De fiesta', lat:20.719849, long:-103.389062)
curva = Location.create(name:'La Curva de San Pedro', description:'Crudea', lat:20.6832405, long:-103.4277494)
guero = Location.create(name:'Tacos El Güero', description:'Recupérate', lat:20.6683404, long:-103.3702445)
social = Location.create(name:'Mariscos El Social', description:'Recupérate', lat:20.6266017, long:-103.307616)
hospicio = Location.create(name:'Hospicio Cabañas', description:'Captura un momento', lat:20.6768865, long:-103.3385503)
rusty = Location.create(name:'The Rusty Trombone', description:'Come', lat:20.671466, long:-103.3719921)
gaspar = Location.create(name:'Gaspar', description:'Postre', lat:20.6714568, long:-103.371839)
panaderia = Location.create(name:'La Panadería', description:'Visita', lat:20.6725401, long:-103.3627224)
juarez = Location.create(name:'Mercado Juárez', description:'Visita', lat:20.6724729, long:-103.3612699)
recco = Location.create(name:'Recco', description:'Cena', lat:20.6729689, long:-103.3679317)


#cafeto = Location.create(name:'Cafeto', description:'Desayuna', lat:20.7106007, long:-103.4150366)
#otates = Location.create(name:'Los Otates', description:'Come', lat:20.6234029, long:-103.421515)
#docena = Location.create(name:'La Docena', description:'Cena', lat:20.7095114, long:-103.4129262)
#reyes = Location.create(name:'Reyes Cantina', description:'Pre', lat:20.712426, long:-103.4096074)
#vango = Location.create(name:'Vango', description:'De fiesta', lat:20.7099639, long:-103.4111881)
#santomar = Location.create(name:'Santo Mar', description:'Recupérate', lat:20.7096763, long:-103.413105)
#monkeybros = Location.create(name:'Monkey Brothers', description:'Botanea', lat:20.7082329, long:-103.4151946)
#puntosurf = Location.create(name:'Punto Surf', description:'Cuídate', lat:20.7088411, long:-103.4064087)
#curroponcho = Location.create(name:'Curro y Poncho', description:'Descubre', lat:20.7094204, long:-103.4146526)
#andares = Location.create(name:'Paseo Andares', description:'Captura un momento', lat:20.7105594, long:-103.4119463)
inf1 = Influencer.create(name: 'José Noé Suro', description: 'La fábrica de cerámica funciona desde 1951, cuando el papá de José Noé la fundó. Tlaquepaque es el nicho ideal para esto, la fama de sus alfareros y artesanos es mundial. Actualmente este espacio produce gran cantidad de piezas de todo tipo, desde piezas tradicionales pintadas a mano, hasta vajillas completas hechas a medida para hoteles y restaurantes. También produce piezas de arte contemporáneo, con materiales tan diversos como la misma cerámica, la madera o el metal. Es esta combinación tan particular la que ha hecho de José Noé el facilitador de proyectos favoritos de muchos artistas.
De la cerámica al arte contemporáneo
Comenzó a coleccionar arte contemporáneo desde hace unos veinte años. A partir de ese momento y hasta ahora, José Noé ha colaborado con más de 300 artistas nacionales e internacionales.
', is_especial: true, video_url: 'fMPd5siU0l4')
inf2 = Influencer.create(name: 'José Ignacio Solórzano', description: "Caricaturista mexicano nacido en Guadalajara, con el nombre de José Ignacio Solórzano. 
Fundador de Galimatías, La Mano y los suplementos de humor La mamá del Abulón y Uno Chango pa el Chamuco.
Dibujó y escribió Los manuscritos del Fongus, Sepa la bola y Los gatos no existen (editada en inglés junto con más de sus obras cortas en una recopilación titulada CatsDon'tExist.
Jis no es estilista, no le importa conservar una tendencia; lo único que le interesa es conectarse con una línea de pensamiento en particular; y explora sin duda cada uno de sus pensamientos, desde los más escatológicos, los profundos, intrincados y complejos, hasta los simplones, ralos y filosóficamente triviales.
Cada tira siempre tiene la particularidad de tener una fibra filosófica subyacente al llamado 'punchline', de tal manera que, se puede explorar a través de sus episodios de locura y sensatez alternadas, en cada día, haciendo una aventura impredecible el esperar día a día sus cartones. Cuenta con un grupo de fervientes seguidores de Facebook que critican y analizan a profundidad sus trazos con frecuencia.
", is_especial: true)
inf3 = Influencer.create(name: 'Ruta Selección Tradicional 1', description: 'Ruta 1')
inf4 = Influencer.create(name: 'Ruta Selección Tradicional 2', description: 'Ruta 2')
inf5 = Influencer.create(name: 'Ruta Selección Tradicional 3', description: 'Ruta 3')

rutapr1 = Route.create(name:'Ruta Suro', description:'Ruta Suro', active:true, influencer_id: inf1.id)
rutapr1.locations << coffeehouse
rutapr1.locations << candela
rutapr1.locations << maz
rutapr1.locations << curva
rutapr1.locations << alcalde
rutapr1.locations << demetria
rutapr1.locations << hueso
rutapr1.locations << guero
rutapr1.locations << hospicio
rutapr1.locations << cabana
rutapr1.locations << travesia
rutapr1.locations << social
rutapr2 = Route.create(name:'Ruta Jis', description:'Ruta Jis', active:true, influencer_id: inf2.id)
rutapr2.locations << recco
rutapr2.locations << rusty
rutapr2.locations << gaspar
rutapr2.locations << juarez
rutapr2.locations << panaderia
rutapr2.locations << teteria
ruta1 = Route.create(name:'Ruta 1', description:'Ruta 1', active:true, influencer_id: inf3.id)
ruta1.locations << fresca
ruta1.locations << tortatono
ruta1.locations << chapalita
ruta1.locations << clarum
ruta1.locations << kukurucho
ruta1.locations << ilatina
ruta1.locations << anitali
ruta1.locations << lula
ruta1.locations << teteria
ruta2 = Route.create(name:'Ruta 2', description:'Ruta 2', active:true, influencer_id: inf4.id)
ruta2.locations << cafebarra
ruta2.locations << mirilla
ruta2.locations << olio
ruta2.locations << saopaulo
ruta2.locations << cortez
ruta2.locations << reddy
ruta2.locations << lamar
ruta2.locations << figueroa
ruta2.locations << montevideo
ruta2.locations << tortatono
ruta2.locations << colomos
ruta3 = Route.create(name:'Ruta 3', description:'Ruta 3', active:true, influencer_id: inf5.id)
ruta3.locations << antigua
ruta3.locations << corredorchap
ruta3.locations << blacksheep
ruta3.locations << pekopeko
ruta3.locations << dieresis
ruta3.locations << pigpearl
ruta3.locations << romea
ruta3.locations << elrey
ruta3.locations << elchacal
ruta3.locations << jeronimo
ruta3.locations << lamexico
ruta3.locations << via