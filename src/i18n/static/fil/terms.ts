import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const terms: PageDefinition = {
  title: 'Mga Tuntunin ng Serbisyo',
  description:
    'Sa pamamagitan ng pag-access o paggamit ng site, sumasang-ayon kang masaklaw ng mga tuntuning ito.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Pagtanggap ng mga tuntunin',
      paragraphs: [
        'Sa pamamagitan ng pag-access o paggamit ng ANQR (anqr.link), sumasang-ayon kang masaklaw ng mga Tuntunin ng Serbisyong ito at ng aming Patakaran sa Pagkapribado. Kung hindi ka sumasang-ayon sa mga tuntuning ito, huwag gamitin ang site.',
        'Maaari naming i-update ang mga Tuntuning ito paminsan-minsan. Ang patuloy na paggamit ng site pagkatapos ng mga pagbabago ay bumubuo ng pagtanggap sa mga bagong tuntunin.',
      ],
    },
    {
      heading: 'Pagiging Karapat-dapat',
      paragraphs: [
        'Dapat ay hindi ka bababa sa 13 taong gulang upang magamit ang ANQR. Sa paggamit ng site, ipinapahayag mo na natutugunan mo ang kinakailangang edad na ito. Kung ikaw ay wala pang 18 taong gulang, ipinapahayag mo na mayroon kang pahintulot ng iyong magulang o tagapag-alaga na gamitin ang site.',
      ],
    },
    {
      heading: 'Pinapayagan na paggamit',
      paragraphs: [
        'Maaari mong gamitin ang ANQR para sa mga layuning naaayon sa batas lamang. Ikaw ang tanging mananagot para sa nilalamang iyong iko-encode sa mga QR code at sa kung paano mo ginagamit ang anumang QR code na iyong nalilikha.',
      ],
    },
    {
      heading: 'Ipinagbabawal na pag-uugali',
      paragraphs: ['Sumasang-ayon kang hindi:'],
      bullets: [
        'Gumamit ng ANQR upang lumikha ng mga QR code na nagpapadali sa phishing, pamamahagi ng malware, pandaraya, mga scam, panliligalig, paninirang-puri, o anumang ilegal na aktibidad.',
        'I-encode ang nilalamang lumalabag sa mga karapatan sa intelektwal na ari-arian, lumalabag sa privacy, o naglalaman ng ilegal na materyal.',
        'Tangkang guluhin, labis na pasanin, o pakialaman ang operasyon o seguridad ng lugar.',
        'Mag-reverse engineer, mag-decompile, o tangkaing kumuha ng source code mula sa site.',
        'Gumamit ng mga automated na tool (mga bot, scraper) upang ma-access ang site sa paraang nakakabawas sa performance ng ibang mga user.',
        'Lagpasan o huwag paganahin ang anumang mga tampok sa seguridad o kontrol sa pag-access.',
        'Magpanggap bilang sinumang tao o entidad o magsinungaling tungkol sa iyong kaugnayan.',
      ],
    },
    {
      heading: 'Intelektwal na ari-arian',
      paragraphs: [
        'Ikaw ang may-ari ng nilalamang iko-encode mo sa mga QR code. Hindi inaangkin ng ANQR ang pagmamay-ari ng iyong data.',
        'Ang pangalan, logo, disenyo ng interface, at pinagbabatayan na code ng ANQR ay protektado ng mga batas sa copyright, trademark, at iba pang mga batas sa intelektwal na ari-arian. Hindi mo maaaring kopyahin, baguhin, mamahagi, o lumikha ng mga hinangong gawa nang walang aming pahintulot.',
        'Ang QR Code® ay isang rehistradong trademark ng DENSO WAVE INCORPORATED. Ang ANQR ay walang kaugnayan sa DENSO WAVE.',
      ],
    },
    {
      heading: 'Lisensya ng nilalaman ng gumagamit',
      paragraphs: [
        'Sa paggamit ng ANQR, wala kang ibinibigay sa amin na karapatan sa iyong nilalaman — lahat ng pagbuo ng QR code ay nangyayari nang lokal sa iyong device at hindi namin ina-access, iniimbak, o ipinapadala ang iyong naka-encode na data.',
        'Kapag ginagamit ang server-side API, ang iyong content ay pinoproseso upang buuin ang QR image ngunit hindi iniimbak, nilololog, o ginagamit para sa anumang ibang layunin maliban sa pag-render ng hiniling na imahe.',
      ],
    },
    {
      heading: 'Mga serbisyo at patalastas ng ikatlong partido',
      paragraphs: [
        'Nagpapakita ang site ng mga advertisement sa pamamagitan ng Google AdSense at maaaring may kasamang mga link sa mga website ng ikatlong partido. Hindi kami responsable para sa nilalaman, serbisyo, o mga kasanayan sa privacy ng ikatlong partido.',
        'Ang iyong mga pakikipag-ugnayan sa mga advertiser at mga ikatlong partido ay tanging sa pagitan mo at nila. Tingnan ang aming Patakaran sa Pagkapribado para sa impormasyon tungkol sa mga kasanayan sa data ng advertising.',
      ],
    },
    {
      heading: 'Pagtatanggi sa mga garantiya',
      paragraphs: [
        'ANG ANQR AY IBINIBIGAY SA ISANG BATAS NA AS IS AT AS AVAILABLE NANG WALANG ANUMANG URI NG MGA GARANTIYA, HAYAGAN O IPINAHIWATIG, KABILANG ANG NGUNIT HINDI LIMITADO SA MGA IPINAHIWATIG NA GARANTIYA NG KAKAYAHANG MAIBENTA, KAANGKUPAN PARA SA ISANG PARTIKULAR NA LAYUNIN, AT HINDI PAGLABAG.',
        'Hindi namin ginagarantiyahan na: (a) ang site ay magiging walang patid, ligtas, o walang error; (b) ang mga QR code ay mai-scan sa lahat ng kapaligiran, sa lahat ng device, o sa lahat ng scanner application; (c) ang site ay makakatugon sa iyong mga kinakailangan.',
        'Dapat mong palaging subukan ang mga QR code sa mga kondisyon kung saan gagamitin ang mga ito (laki ng print, ilaw, uri ng screen, distansya, kalidad ng camera).',
      ],
    },
    {
      heading: 'Limitasyon ng pananagutan',
      paragraphs: [
        'HANGGANG SA PINAKAMALAWAK NA SAKLAW NA PINAPAHINTULUTAN NG BATAS, ANG ANQR AT ANG MGA OPERATOR, KASAMA, AT MGA TAGAPAGLISENSYA NITO AY HINDI MANANAGOT PARA SA ANUMANG DIREKTA, INDIREKTA, INSIDENTAL, ESPESYAL, KONSEKWENSYAL, PUNITIBO, O HALIMBAWA NA MGA PINSALA, KABILANG ANG NGUNIT HINDI LIMITADO SA MGA PINSALA PARA SA PAGKAWALA NG MGA KITA, KITA, DATOS, GOODWILL, PAGGAMIT, O IBA PANG MGA HINDI NAHAHATANG PAGKAWALA, NA NAGMULA SA O MAY KAUGNAYAN SA IYONG PAG-ACCESS SA O PAGGAMIT NG (O KAWALAN NG KAKAYAHAN NA MA-ACCESS O GAMITIN) ANG SERBISYO.',
        'HAYANG NAUUNAWAAN MO AT SUMASANG-AYON NA ANG IYONG PAGGAMIT NG SERBISYO AY NASA IYONG SARILING PANANAGUTAN. ANG SERBISYO AY IBINIBIGAY NANG LIBRE, AT AYON DITO, SUMASANG-AYON KA NA ANG ANQR AT ANG MGA OPERATOR NITO AY WALANG PANANAGUTAN SA IYO PARA SA ANUMANG MGA PINSALA O PAGKALUGI. SA ANUMANG PANGYAYARI AY HINDI LALAMPAS SA SERO DOLYAR ($0 AUD) ANG AMING KABUUANG KABUUANG PANANAGUTAN.',
        'SUMASANG-AYON KA NA PALABASIN, IWASAN, AT IWASAN ANG ANUMAN AT LAHAT NG MGA PAGHAHAIN, KAHILINGAN, AT MGA DAHILAN NG AKSYON LABAN SA ANQR AT SA MGA OPERATOR NITO NA NAGMULA SA IYONG PAGGAMIT NG SERBISYO.',
        'ANG ILANG HURISDIKSYON AY HINDI NAGPAPAHINTULOT NG PAGBUBUKOD NG ILANG MGA WARRANTY O LIMITASYON NG PANANAGUTAN. SA MGA GANITONG HURISDIKSYON, ANG AMING PANANAGUTAN AY LIMITADO SA PINAKAMALAWAK NA SAKLAW NA PINAPAHINTULUTAN NG NAAANGKOP NA BATAS.',
      ],
    },
    {
      heading: 'Indemnipikasyon',
      paragraphs: [
        'Sumasang-ayon kang bayaran, ipagtanggol, at hindi managot ang ANQR, ang mga operator, kaakibat, at ang kani-kanilang mga opisyal, direktor, empleyado, at ahente mula sa anumang mga paghahabol, pinsala, pagkalugi, pananagutan, gastos, at gastusin (kabilang ang mga bayarin sa abogado) na nagmumula sa: (a) ang iyong paggamit ng site; (b) ang iyong paglabag sa mga Tuntuning ito; (c) ang iyong paglabag sa anumang mga karapatan ng ikatlong partido; (d) anumang nilalaman na iyong iko-encode sa mga QR code.',
      ],
    },
    {
      heading: 'Paglutas ng Hindi Pagkakasundo',
      paragraphs: [
        'Anumang hindi pagkakaunawaan na magmumula sa mga Tuntuning ito o sa iyong paggamit ng ANQR ay susubukan munang lutasin sa pamamagitan ng impormal na negosasyon sa pamamagitan ng pakikipag-ugnayan sa ${CONTACT_EMAIL}.',
        'Kung mabigo ang impormal na resolusyon, ang mga hindi pagkakaunawaan ay lulutasin sa pamamagitan ng may bisang arbitrasyon sa Victoria, Australia, maliban na ang alinmang partido ay maaaring humingi ng injunctive relief sa korte para sa mga paglabag sa intelektwal na ari-arian.',
      ],
    },
    {
      heading: 'Pagpapaubaya sa class action',
      paragraphs: [
        'HANGGANG SA SUKLAY NA PINAPAHINTULUTAN NG BATAS, SUMASANG-AYON KA NA ANG ANUMANG MGA PAGLILITIS SA PAGRESOLUSYON NG HINDI PAGTATALO AY ISASAGAWA LAMANG SA ISANG INDIBIDWAL NA BASE AT HINDI SA ISANG AKSYONG PANG-URI, PINAGSAMANG, O KINATAWAN.',
      ],
    },
    {
      heading: 'Namamahalang batas',
      paragraphs: [
        'Ang mga Tuntuning ito ay pinamamahalaan ng mga batas ng Victoria, Australia, nang hindi isinasaalang-alang ang mga prinsipyo ng tunggalian ng mga batas. Pumapayag ka sa eksklusibong hurisdiksyon ng mga korte na matatagpuan sa Victoria, Australia.',
      ],
    },
    {
      heading: 'Mga Pagbabago at Kakayahang Magamit',
      paragraphs: [
        'Maaari naming baguhin, suspindihin, o ihinto ang site (o anumang bahagi nito) anumang oras nang walang abiso o pananagutan.',
        'Maaari naming i-update ang mga Tuntuning ito anumang oras. Ang petsang Huling na-update ay nagpapahiwatig kung kailan ang mga ito ay pinakahuling binago. Ang patuloy na paggamit pagkatapos ng mga pagbabago ay bumubuo ng pagtanggap.',
      ],
    },
    {
      heading: 'Paghihiwalay',
      paragraphs: [
        'Kung ang alinmang probisyon ng mga Tuntuning ito ay maituring na hindi wasto o hindi maipapatupad, ang probisyong iyon ay ipapatupad sa pinakamataas na lawak na pinahihintulutan, at ang mga natitirang probisyon ay mananatiling may ganap na bisa at bisa.',
      ],
    },
    {
      heading: 'Pagpapaubaya',
      paragraphs: [
        'Ang aming pagkabigong ipatupad ang anumang karapatan o probisyon ng mga Tuntuning ito ay hindi maituturing na pagtalikod sa naturang karapatan o probisyon.',
      ],
    },
    {
      heading: 'Buong kasunduan',
      paragraphs: [
        'Ang mga Tuntuning ito, kasama ang aming Patakaran sa Pagkapribado, ay bumubuo sa buong kasunduan sa pagitan mo at ng ANQR patungkol sa iyong paggamit ng site at pumapalit sa anumang naunang kasunduan.',
      ],
    },
    {
      heading: 'Force majeure',
      paragraphs: [
        'Hindi kami mananagot para sa anumang pagkabigo o pagkaantala sa pagganap dahil sa mga pangyayaring lampas sa aming makatwirang kontrol, kabilang ang mga natural na sakuna, digmaan, terorismo, kaguluhan, aksyon ng gobyerno, o pagkabigo ng internet/imprastraktura.',
      ],
    },
    {
      heading: 'Makipag-ugnayan',
      paragraphs: [
        'Maaaring ipadala ang mga tanong tungkol sa mga Tuntuning ito sa: ${CONTACT_EMAIL}',
      ],
    },
  ],
};

export default terms;
