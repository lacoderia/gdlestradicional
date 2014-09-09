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
burritos = Location.create(name:'Burritos Hospital Sta María Chapalita', description:'Botanea', lat:20.6671494, long:-103.4089874)
kukurucho = Location.create(name:'Los Kukuruchos', description:'Descubre', lat:20.6586665, long:-103.3983908)
chapalita = Location.create(name:'La Glorieta Chapalita', description:'Captura un momento', lat:20.6663616, long:-103.4026873)
cafebarra= Location.create(name:'Café Barra', description:'Desayuna', lat:20.6985765, long:-103.3825064)
cortez = Location.create(name:'Cortez', description:'Come', lat:20.7003178, long:-103.3754092)
saopaulo = Location.create(name:'Punto Sao Paulo', description:'Pasa la tarde', lat:20.7023301, long:-103.3763695)
olio = Location.create(name:'Olio Bistro', description:'Cena', lat:20.7019898, long:-103.3763877)
lamar = Location.create(name:'La Mar', description:'Pre', lat:20.6908082, long:-103.3867013)
figueroa = Location.create(name:'La Figueroa', description:'De fiesta', lat:20.6922206, long:-103.3864861)
reddy = Location.create(name:'Reddy Sandwiches', description:'Botanea', lat:20.693446, long:-103.384015)
colmos = Location.create(name:'Los Colmos', description:'Cuídate', lat:20.707669, long:-103.391053)
mirilla = Location.create(name:'La Mirilla', description:'Descubre', lat:20.6997098, long:-103.3826046)
montevideo = Location.create(name:'Esculturas Montevideo', description:'Captura un momento', lat:20.6960182, long:-103.3909996)
cafeto = Location.create(name:'Cafeto', description:'Desayuna', lat:20.7106007, long:-103.4150366)
otates = Location.create(name:'Los Otates', description:'Come', lat:20.6234029, long:-103.421515)
docena = Location.create(name:'La Docena', description:'Cena', lat:20.7095114, long:-103.4129262)
reyes = Location.create(name:'Reyes Cantina', description:'Pre', lat:20.712426, long:-103.4096074)
vango = Location.create(name:'Vango', description:'De fiesta', lat:20.7099639, long:-103.4111881)
santomar = Location.create(name:'Santo Mar', description:'Recupérate', lat:20.7096763, long:-103.413105)
monkeybros = Location.create(name:'Monkey Brothers', description:'Botanea', lat:20.7082329, long:-103.4151946)
puntosurf = Location.create(name:'Punto Surf', description:'Cuídate', lat:20.7088411, long:-103.4064087)
curroponcho = Location.create(name:'Curro y Poncho', description:'Descubre', lat:20.7094204, long:-103.4146526)
andares = Location.create(name:'Paseo Andares', description:'Captura un momento', lat:20.7105594, long:-103.4119463)

#rutapr1 = Route.create(name:'Ruta Suro', description:'Ruta Suro', active:true)
#rutapr2 = Route.create(name:'Ruta Jis', description:'Ruta Jis', active:true)
ruta1 = Route.create(name:'Ruta 1', description:'Ruta 1', active:true)
ruta1.locations << fresca
ruta1.locations << anitali
ruta1.locations << teteria
ruta1.locations << lula
ruta1.locations << clarum
ruta1.locations << ilatina
ruta1.locations << tortatono
ruta1.locations << burritos
ruta1.locations << kukurucho
ruta1.locations << chapalita
ruta2 = Route.create(name:'Ruta 2', description:'Ruta 2', active:true)
ruta2.locations << cafebarra
ruta2.locations << cortez
ruta2.locations << saopaulo
ruta2.locations << olio
ruta2.locations << lamar
ruta2.locations << figueroa
ruta2.locations << tortatono
ruta2.locations << reddy
ruta2.locations << colmos
ruta2.locations << mirilla
ruta2.locations << montevideo
ruta3 = Route.create(name:'Ruta 3', description:'Ruta 3', active:true)
ruta3.locations << cafeto
ruta3.locations << otates
ruta3.locations << docena
ruta3.locations << reyes
ruta3.locations << vango
ruta3.locations << santomar
ruta3.locations << monkeybros
ruta3.locations << puntosurf
ruta3.locations << curroponcho
ruta3.locations << andares


photo1 = Photo.create(instagram_id:'786286069276426306_4290975', caption:'Mykonos in Tlaquepaque #scouting #gdlestradicional #museum #brothers #lovemyjob #youbetterwork', author_id:'4290975', author_nickname:'paulorendain', lat:20.68734075, long:-103.264199421, url_low:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10616964_615864088534897_1350848748_a.jpg', url_thumb:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10616964_615864088534897_1350848748_s.jpg', url_normal:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10616964_615864088534897_1350848748_n.jpg')
photo1a = Photo.create(instagram_id:'774878380061542005_1234368248', caption:'@gibranjulian para la nueva campaña de #gdlestradicional de @jctradicional. #behindthescenes #brandmanagment #nuevastradiciones #libertad #campaign', author_id:'1234368248', author_nickname:'propom_pr', lat:20.671838615, long:-103.362571007, url_low:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10576066_665681900183310_1277629642_a.jpg', url_thumb:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10576066_665681900183310_1277629642_s.jpg', url_normal:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10576066_665681900183310_1277629642_n.jpg')
photo1b = Photo.create(instagram_id:'774867429322725788_252014933', caption:'Encantados en el detrás de cámaras de lo que será la nueva campaña de @jctradicional #gdlestradicional con 2 guapos tapatios @marianapad y @gibranjulian.', author_id:'252014933', author_nickname:'gentebienjalisco', lat:20.671866921, long:-103.362571675,  url_low:'http://scontent-b.cdninstagram.com/hphotos-xfp1/t51.2885-15/1169700_1491590147752961_500349844_a.jpg', url_thumb:'http://scontent-b.cdninstagram.com/hphotos-xfp1/t51.2885-15/1169700_1491590147752961_500349844_s.jpg', url_normal:'http://scontent-b.cdninstagram.com/hphotos-xfp1/t51.2885-15/1169700_1491590147752961_500349844_n.jpg')
photo2 = Photo.create(instagram_id:'784134055455720422_11388679', caption:'#chapalalake #cuisinart #josecuervo #tradicional #elchante #margarita #tequila #tamarindo', author_id:'11388679', author_nickname:'fredoestrada', lat:20.291026222, long:-103.400218461, url_low:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598275_1487239348183655_1473141266_a.jpg', url_thumb:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598275_1487239348183655_1473141266_s.jpg', url_normal:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598275_1487239348183655_1473141266_n.jpg')
photo3 = Photo.create(instagram_id:'783670677211493887_195756324', caption:'Andrea & Julio Fest #ready #agarrense #underground #gdlestradicional #nuevastradiciones @jctradicional', author_id:'195756324', author_nickname:'andreasernagcia', lat:20.675975322, long:-103.373211575, url_low:'http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10607957_1457467614534320_611359548_a.jpg', url_thumb:'http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10607957_1457467614534320_611359548_s.jpg', url_normal:'http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10607957_1457467614534320_611359548_n.jpg')
photo4 = Photo.create(instagram_id:'783331852341428455_4290975', caption:'My PinUp Girls pic by @rostrosjalisco #memories #goodtimes #gdlestradicional #veranoretro @jctradicional', author_id:'4290975', author_nickname:'paulorendain', lat:20.670636609, long:-103.371775552,  url_low:'http://scontent-b.cdninstagram.com/hphotos-xfa1/t51.2885-15/10598507_1486241151618415_648768050_a.jpg', url_thumb:'http://scontent-b.cdninstagram.com/hphotos-xfa1/t51.2885-15/10598507_1486241151618415_648768050_s.jpg', url_normal:'http://scontent-b.cdninstagram.com/hphotos-xfa1/t51.2885-15/10598507_1486241151618415_648768050_n.jpg')
photo5 = Photo.create(instagram_id:'782799475760382563_4290975', caption:'Brothers pic by @revista_gdlfashion #memories #gdlestradicional @jctradicional #GBWeb #gootimes', author_id:'4290975', author_nickname:'paulorendain', lat:20.672150527, long:-103.373095054, url_low:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10554222_306412336204469_1157244393_a.jpg', url_thumb:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10554222_306412336204469_1157244393_s.jpg', url_normal:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10554222_306412336204469_1157244393_n.jpg')
photo6 = Photo.create(instagram_id:'781528622611514196_4290975', caption:'PROUD! Congrats @sofyalvarez @lucho_fdz @gentebienjalisco x su nuevo website!!! #gdlestradicional #party #friends #goodtimes', author_id:'4290975', author_nickname:'paulorendain', lat:20.672150527, long:-103.373095054, url_low:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598202_641446452640827_1872507610_a.jpg', url_thumb:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598202_641446452640827_1872507610_s.jpg', url_normal:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598202_641446452640827_1872507610_n.jpg')
photo7 = Photo.create(instagram_id:'780578311403160011_4290975', caption:'Providenciando #greenwall #architectureporn #barriando #esloquehay #scouting #me #gdlestradicional', author_id:'4290975', author_nickname:'paulorendain', lat:20.685920791, long:-103.384358829, url_low:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10576000_683524101723817_135320225_a.jpg', url_thumb:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10576000_683524101723817_135320225_s.jpg', url_normal:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10576000_683524101723817_135320225_n.jpg')
photo8 = Photo.create(instagram_id:'777870020763927075_4290975', caption:'Joyas Tapatías #architectureporn #downtown #gdlestradicional #myview #scounting', author_id:'4290975', author_nickname:'paulorendain', lat:20.673888889, long:-103.339722222, url_low:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10584768_366581760159715_1728674222_a.jpg', url_thumb:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10584768_366581760159715_1728674222_s.jpg', url_normal:'http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10584768_366581760159715_1728674222_n.jpg')

