import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: '"Xhumana Nathi”',
  description: '"Siyakwamukela impendulo, imibiko yeziphazamiso, izicelo zezici, kanye nemibuzo ejwayelekile.”',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '"Indlela yokufinyelela kithi”',
      paragraphs: [
        '"Sinikeza izindlela eziningana zokuxhumana nathi kuye ngezidingo zakho. Sifunda yonke imiyalezo, yize izikhathi zokuphendula zingahluka ngokuya ngevolumu kanye nohlobo lombuzo.”',
      ],
    },
    {
      heading: '"I-imeyili”',
      paragraphs: [
        '"Ngayo yonke imibuzo: ${CONTACT_EMAIL}”',
        '"Lena yindlela ethembekile kakhulu yokusithinta futhi iyanconywa ngemibuzo enemininingwane, imibuzo yebhizinisi, noma eminye imibuzo.”',
      ],
    },
    {
      heading: '"Izinhlobo zemibuzo”',
      bullets: [
        '"Imibuzo evamile: Imibuzo mayelana nendlela yokusebenzisa i-ANQR, izincazelo zezici, noma impendulo evamile.”',
        '"Imibiko yeziphazamisi: Sicela ufake isiphequluli sakho, uhlelo lokusebenza, izinyathelo zokukhiqiza kabusha, kanye nanoma yimiphi imiyalezo yamaphutha oyibonayo.”',
        '"Izicelo zezici: Iziphakamiso zezici ezintsha noma ukuthuthukiswa. Sicabangela zonke izicelo yize singenakuthembisa ukuqaliswa kwazo.”',
        '"Imibuzo yebhizinisi: Amathuba okubambisana, imibuzo yelayisensi, noma imibuzo yokusetshenziswa kwezentengiselwano.”',
        '"Izicelo zobumfihlo: Izicelo zokusebenzisa amalungelo akho obumfihlo ngaphansi kwe-GDPR, i-CCPA, noma eminye imithetho yobumfihlo (bheka Inqubomgomo Yobumfihlo).”',
        '"I-DMCA/I-Copyright: Bheka isigaba se-DMCA ngezansi ukuze uthole izidingo zesaziso sokususa.”',
      ],
    },
    {
      heading: '"Izikhathi zokuphendula”',
      paragraphs: [
        '"Sihlose ukuphendula imibuzo zingakapheli izinsuku ezi-5-7 zebhizinisi. Izicelo ezihlobene nobumfihlo zizoxazululwa zingakapheli izinsuku ezingama-30 njengoba kudingeka ngokomthetho.”',
        '"Ngezikhathi ezimatasa, izikhathi zokuphendula zingase zibe zinde. Uma ubhekene nezindaba eziphuthumayo, sicela ubhale ukuthi "KUYAPHUTHUMALA” emugqeni wesihloko sakho.”',
      ],
    },
    {
      heading: '"Ngaphambi kokuxhumana nathi”',
      paragraphs: [
        '"Sicela uhlole ikhasi lethu leMibhalo ukuthola izimpendulo zemibuzo evamile mayelana nendlela yokusebenzisa izici ze-ANQR. Imibuzo eminingi mayelana nokukhiqizwa kwekhodi ye-QR, isitayela, kanye nezinketho zokuthumela ngaphandle ihlanganiswe lapho.”',
      ],
    },
    {
      heading: '"Izaziso ze-copyright ze-DMCA”',
      paragraphs: [
        '"Uma ukholelwa ukuthi okuqukethwe okutholakala ku-ANQR kwephula ilungelo lakho lobunikazi, ungathumela isaziso sokususa i-Digital Millennium Copyright Act (DMCA). Ukuze sisebenze, isaziso sakho kumele sihlanganise:”',
      ],
      bullets: [
        '"Isiginesha esingokoqobo noma se-elekthronikhi somnikazi we-copyright noma i-ejenti egunyaziwe.”',
        '"Ukuhlonza umsebenzi onelungelo lokushicilela okuthiwa wephuliwe.”',
        '"Ukuhlonza izinto okuthiwa zephula umthetho, ngolwazi olwanele ukuzithola.”',
        '"Ulwazi lwakho lokuxhumana (ikheli, inombolo yocingo, kanye nekheli le-imeyili).”',
        '"Isitatimende sokuthi unokholo oluhle lokuthi ukusetshenziswa kwezinto akuvunyelwe ngumnikazi welungelo lokushicilela.”',
        '"Isitatimende, ngaphansi kwesijeziso sokuqamba amanga, sokuthi ulwazi olusesazisweni sakho lunembile nokuthi ungumnikazi we-copyright noma ugunyaziwe ukwenza okuthile egameni labo.”',
      ],
    },
    {
      heading: '"Ukuxhumana kwe-DMCA”',
      paragraphs: [
        '"Thumela izaziso ze-DMCA ku: ${CONTACT_EMAIL}”',
        '"Sicela ufake "Isaziso se-DMCA" emgqeni wesihloko. Sizophendula izaziso ezivumelekile ngokuhambisana nomthetho osebenzayo. Qaphela ukuthi i-ANQR ikhiqiza amakhodi e-QR endaweni yakini kumadivayisi abasebenzisi futhi ayigcini okuqukethwe okudalwe ngabasebenzisi.”',
      ],
    },
  ],
};

export default contact;
