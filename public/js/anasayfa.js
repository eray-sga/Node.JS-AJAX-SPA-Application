$(document).ready(function() {
    var yerler = $.getJSON("/api/yerler")

    yerler
    .then(yerlerEkle);

    //inputa değer girilip enter'a basılırsa yeni sehir eklenecek
    $('#bizimInput').keypress((e) => {
        if(e.which == 13){
            yeniSehirEkle()
        }
    })

    //şehir silme işlemi
    $('.yerler').on('click','.fa', function(){

        //tıkladığımız liyi seçiyoruz
        var tiklanan = $(this).parent().parent()
        //tiklanan elemanın içinde bir id var onu url'e veriyoruz.
        var silinenURL = '/api/yerler/'+tiklanan.data('id')

        $.ajax({
            method:'DELETE',
            url: silinenURL
        })
        .then((silinenData) => {
            console.log(silinenData);
            tiklanan.remove()
        })
    })

    $('.yerler').on('click','li', function(){
        
        ziyaretDurumuGuncelle($(this))
    })

})

function yerlerEkle(yerler){
    yerler.forEach(function(yer){
        yerEkle(yer);
    })
}

function yerEkle(yer){
    
    var yeniYer = $('<li class="yerlerimiz">'+yer.isim+ ' <span><i class="fa fa-trash-o" aria-hidden="true"></i></span></li>')
    //silinmesi için gizli id
    yeniYer.data('id', yer._id)

    //ziyaret edilme durumunu kontrol etmek için data oluşturalım
    yeniYer.data('ziyaretDurumu', yer.ziyaret)

    if(yer.ziyaret==true){
        $(yeniYer).addClass('ziyaretEdilmis')
    }
    $('.yerler').append(yeniYer)
}

function yeniSehirEkle(){
    var yeniSehir = $('#bizimInput').val()

    $.post('/api/yerler', {isim: yeniSehir})
    .then((yeniEklenenSehir) => {
        yerEkle(yeniEklenenSehir)
        $('#bizimInput').val('')
    })
}

function ziyaretDurumuGuncelle(yer){
    var guncellemeUrl = '/api/yerler/'+yer.data('id')
    var ziyaretDurumu = yer.data('ziyaretDurumu')
    var guncelle = {ziyaret:!ziyaretDurumu}

    $.ajax({
        method: 'PUT',
        url: guncellemeUrl,
        data: guncelle
    })
    .then((guncellenmisYer) => {
        console.log(guncellenmisYer);
        yer.toggleClass('ziyaretEdilmis')
        yer.data('ziyaretDurumu', !ziyaretDurumu)
    })
}