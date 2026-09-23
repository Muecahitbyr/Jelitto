/**
 * Datenschutzerklärung und AGB – 1:1 von fahrschule-jelitto.com/impressum übernommen.
 * Automatisch aus dem bestehenden WordPress-Inhalt erzeugt; Änderungen hier direkt vornehmen.
 */

export type LegalLink = { href: string; label: string }
export type LegalParagraph = { text: string; links?: LegalLink[] }
export type LegalSection = { heading: string; paragraphs: LegalParagraph[] }
export type AgbBlock = { heading: string | null; paragraphs: string[] }
export type AgbZiffer = { title: string; blocks: AgbBlock[] }

export const datenschutz: { address: string[]; intro: LegalParagraph[]; sections: LegalSection[] } = {
  "address": [
    "Fahrschule Jelitto",
    "Berndt Gaugler",
    "Alte Weberei 12",
    "87600 Kaufbeuren"
  ],
  "intro": [
    {
      "text": "Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.)."
    }
  ],
  "sections": [
    {
      "heading": "Widerruf Ihrer Einwilligung zur Datenverarbeitung",
      "paragraphs": [
        {
          "text": "Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt."
        }
      ]
    },
    {
      "heading": "Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde",
      "paragraphs": [
        {
          "text": "Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Der folgende Link stellt eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten bereit: https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html.",
          "links": [
            {
              "href": "https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html",
              "label": "https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
            }
          ]
        }
      ]
    },
    {
      "heading": "Recht auf Datenübertragbarkeit",
      "paragraphs": [
        {
          "text": "Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist."
        }
      ]
    },
    {
      "heading": "Recht auf Auskunft, Berichtigung, Sperrung, Löschung",
      "paragraphs": [
        {
          "text": "Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden."
        }
      ]
    },
    {
      "heading": "SSL- bzw. TLS-Verschlüsselung",
      "paragraphs": [
        {
          "text": "Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile."
        }
      ]
    },
    {
      "heading": "Verwendung von Google Maps",
      "paragraphs": [
        {
          "text": "Diese Webseite verwendet Google Maps API, um geographische Informationen visuell darzustellen. Bei der Nutzung von Google Maps werden von Google auch Daten über die Nutzung der Kartenfunktionen durch Besucher erhoben, verarbeitet und genutzt. Nähere Informationen über die Datenverarbeitung durch Google können Sie den Google-Datenschutzhinweisen entnehmen. Dort können Sie im Datenschutzcenter auch Ihre persönlichen Datenschutz-Einstellungen verändern.",
          "links": [
            {
              "href": "http://www.google.com/privacypolicy.html",
              "label": "den Google-Datenschutzhinweisen"
            }
          ]
        },
        {
          "text": "Ausführliche Anleitungen zur Verwaltung der eigenen Daten im Zusammenhang mit Google-Produkten finden Sie hier.",
          "links": [
            {
              "href": "http://www.dataliberation.org/",
              "label": "finden Sie hier"
            }
          ]
        }
      ]
    },
    {
      "heading": "Online-Anmeldung",
      "paragraphs": [
        {
          "text": "Sie haben auf unserer Website die Möglichkeit, den Anmeldevorgang zu einer Führerscheinausbildung online einzuleiten. Wenn Sie sich hierzu entscheiden, werden im Rahmen des Anmeldevorgangs die markierten Pflichtangaben (Name, Vorname, Adresse und Mobiltelefonnummer usw.) verarbeitet, damit wir die Vertragsunterlagen entsprechend vorbereiten können. Ihre Daten werden damit zu unserem Fahrschulprogramm (Fahrschulmanager, Verlag Heinrich Vogel) gesendet und anschließend von einem Mitarbeiter verarbeitet. Dabei werden wir Sie per E-Mail, Telefon oder direkt vor Ort kontaktieren, um einen Termin zum Vertragsabschluss zu vereinbaren. Ein Vertrag kommt erst bei Unterzeichnung der Vertragsunterlagen zustande."
        },
        {
          "text": "Kommt es nicht zum Vertragsabschluss, werden wir alle von Ihnen gespeicherten Daten löschen, sofern keine gesetzliche Aufbewahrungspflicht für die Daten besteht."
        }
      ]
    }
  ]
}

export const agb: AgbZiffer[] = [
  {
    "title": "Ziffer 1",
    "blocks": [
      {
        "heading": "Bestandteil der Ausbildung",
        "paragraphs": [
          "Die Fahrausbildung umfasst theoretischen und praktischen Fahrunterricht."
        ]
      },
      {
        "heading": "Schriftlicher Ausbildungsvertrag",
        "paragraphs": [
          "Sie erfolgt aufgrund eines schriftlichen Ausbildungsvertrages."
        ]
      },
      {
        "heading": "Rechtliche Grundlagen der Ausbildung",
        "paragraphs": [
          "Der Unterricht wird aufgrund der hierfür geltenden gesetzlichen Bestimmungen und der auf ihnen beruhenden Rechtsverordnungen, namentlich der Fahrschülerausbildungsordnung, erteilt. Im Übrigen gelten die nachstehenden Bedingungen, die Bestandteile des Ausbildungsvertrages sind."
        ]
      },
      {
        "heading": "Beendigung der Ausbildung",
        "paragraphs": [
          "Die Ausbildung endet mit der bestandenen Fahrerlaubnisprüfung, in jedem Fall nach Ablauf von 1 Jahr seit Abschluss des Ausbildungsvertrages.",
          "Wird das Ausbildungsverhältnis nach Beendigung fortgesetzt, so sind für die angebotenen Leistungen der Fahrschule die Entgelte der Fahrschule maßgeblich, die durch den nach § 32 FahrIG bestimmten Preisaushang zum Zeitpunkt der Fortsetzung des Ausbildungsvertrages ausgewiesen sind. Hierauf hat die Fahrschule bei Fortsetzung hinzuweisen."
        ]
      },
      {
        "heading": "Eignungsmängel des Fahrschülers",
        "paragraphs": [
          "Stellt sich nach Abschluss des Ausbildungsvertrages heraus, dass der Fahrschüler die notwendigen körperlichen oder geistigen Anforderungen für den Erwerb der Fahrerlaubnis nicht erfüllt, so ist für die Leistungen der Fahrschule Ziffer 6 anzuwenden."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 2",
    "blocks": [
      {
        "heading": "Entgelte, Preisaushang",
        "paragraphs": [
          "Die im Ausbildungsvertrag zu vereinbarenden Entgelte haben den durch Aushang in der Fahrschule bekanntgegebenen zu entsprechen."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 3",
    "blocks": [
      {
        "heading": "Grundbetrag und Leistungen",
        "paragraphs": [
          "a) Mit dem Grundbetrag werden abgegolten:",
          "Die allgemeinen Aufwendungen der Fahrschule sowie die Erteilung des theoretischen Unterrichts und erforderliche Vorprüfungen bis zur ersten theoretischen Prüfung.",
          "Für die weitere Ausbildung im Falle des Nichtbestehens der theoretischen Prüfung ist die Fahrschule berechtigt, den hierfür im Ausbildungsvertrag vereinbarten Teilgrundbetrag zu berechnen, höchstens aber die Hälfte des Grundbetrages der jeweiligen Klasse; die Erhebung eines Teilgrundbetrages nach nicht bestandener praktischer Prüfung ist unzulässig."
        ]
      },
      {
        "heading": "Entgelt für Fahrstunden und Leistungen",
        "paragraphs": [
          "b) Mit dem Entgelt für die Fahrstunde von 45 Minuten Dauer werden abgegolten:",
          "Die Kosten für das Ausbildungsfahrzeug, einschließlich der Fahrzeugversicherungen sowie die Erteilung des praktischen Fahrunterrichts."
        ]
      },
      {
        "heading": "Absage der Fahrstunden/Benachrichtigungsfrist",
        "paragraphs": [
          "Kann der Fahrschüler eine vereinbarte Fahrstunde nicht einhalten, so ist die Fahrschule unverzüglich zu verständigen. Werden vereinbarte Fahrstunden nicht mindestens 2 Werktage vor dem vereinbarten Termin abgesagt, ist die Fahrschule berechtigt, eine Ausfallentschädigung für vom Fahrschüler nicht wahrgenommene Fahrstunden in Höhe von drei Vierteln des Fahrstundenentgeltes zu verlangen. Dem Fahrschüler bleibt der Nachweis vorbehalten, ein Schaden sei nicht oder in wesentlich geringerer Höhe entstanden."
        ]
      },
      {
        "heading": "Entgelt für die Vorstellung zur Prüfung und Leistungen",
        "paragraphs": [
          "c) Mit dem Entgelt für die Vorstellung zur Prüfung werden abgegolten:",
          "Die theoretische und die praktische Prüfungsvorstellung einschließlich der Prüfungsfahrt.",
          "Bei Wiederholungsprüfungen wird das Entgelt, wie im Ausbildungsvertrag vereinbart, erhoben."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 4",
    "blocks": [
      {
        "heading": "Zahlungsbedingungen",
        "paragraphs": [
          "Soweit nichts anderes vereinbart ist, werden der Grundbetrag bei Abschluss des Ausbildungsvertrages, das Entgelt für die Fahrstunde vor Antritt derselben, der Betrag für die Vorstellung zur Prüfung zusammen mit eventuell verauslagten Verwaltungs- und Prüfungsgebühren spätestens 3 Werktage vor der Prüfung fällig."
        ]
      },
      {
        "heading": "Leistungsverweigerung bei Nichtausgleich der Forderungen",
        "paragraphs": [
          "Wird das Entgelt nicht zur Fälligkeit bezahlt, so kann die Fahrschule die Fortsetzung der Ausbildung sowie die Anmeldung und Vorstellung zur Prüfung bis zum Ausgleich der Forderungen verweigern."
        ]
      },
      {
        "heading": "Entgeltentrichtung bei Fortsetzung der Ausbildung",
        "paragraphs": [
          "Das Entgelt für eine eventuell erforderliche weitere theoretische Ausbildung (Ziffer 3a Abs. 2) ist vor Beginn derselben zu entrichten."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 5",
    "blocks": [
      {
        "heading": "Kündigung des Vertrages",
        "paragraphs": [
          "Der Ausbildungsvertrag kann vom Fahrschüler jederzeit, von der Fahrschule nur aus wichtigem Grund gekündigt werden:"
        ]
      },
      {
        "heading": "Ein wichtiger Grund liegt insbesondere vor, wenn der Fahrschüler",
        "paragraphs": [
          "a) trotz Aufforderung und ohne triftigen Grund nicht innerhalb von 4 Wochen seit Vertragsabschluss mit der Ausbildung beginnt oder er diese um mehr als 3 Monate ohne triftigen Grund unterbricht,",
          "b) den theoretischen oder den praktischen Teil der Fahrerlaubnisprüfung nach jeweils zweimaliger Wiederholung nicht bestanden hat,",
          "c) wiederholt oder gröblich gegen Weisungen oder Anordnungen des Fahrlehrers verstößt."
        ]
      },
      {
        "heading": "Textform der Kündigung",
        "paragraphs": [
          "Eine Kündigung des Ausbildungsvertrages ist nur wirksam, wenn sie in Textform erfolgt."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 6",
    "blocks": [
      {
        "heading": "Entgelte bei Vertragskündigung",
        "paragraphs": [
          "Wird der Ausbildungsvertrag gekündigt, so hat die Fahrschule Anspruch auf das Entgelt für die erbrachten Fahrstunden und eine etwa erfolgte Vorstellung zur Prüfung.",
          "Kündigt die Fahrschule aus wichtigem Grund oder der Fahrschüler, ohne durch ein vertragswidriges Verhalten der Fahrschule veranlasst zu sein (siehe Ziffer5), steht der Fahrschule folgendes Entgelt zu",
          "a) 1/5 des Grundbetrages, wenn die Kündigung nach Vertragsschluss mit der Fahrschule, aber vor Beginn der Ausbildung erfolgt;",
          "b) 2/5 des Grundbetrages, wenn die Kündigung nach Beginn der theoretischen Ausbildung, aber vor der Absolvierung eines Drittels der für die beantragten Klassen vorgeschriebenen theoretischen Mindestunterrichtseinheiten erfolgt;",
          "c) 3/5 des Grundbetrages, wenn die Kündigung nach der Absolvierung eines Drittels, aber vor dem Abschluss von zwei Dritteln der für die beantragten Klassen vorgeschrieben theoretischen Mindestunterrichtseinheiten erfolgt;",
          "d) 4/5 des Grundbetrages, wenn die Kündigung nach der Absolvierung von zwei Dritteln der für die beantragten Klassen vorgeschriebenen theoretischen Mindestunterrichtseinheiten erfolgt, aber vor deren Abschluss;",
          "e) der volle Grundbetrag, wenn die Kündigung nach dem Abschluss der theoretischen Ausbildung erfolgt.",
          "Dem Fahrschüler bleibt der Nachweis vorbehalten, dass ein Entgelt oder ein Schaden in der jeweiligen Höhe nicht angefallen oder nur geringer angefallen ist.",
          "Kündigt die Fahrschule ohne wichtigen Grund oder der Fahrschüler, weil er hierzu durch ein vertragswidriges Verhalten der Fahrschule veranlasst wurde, steht der Fahrschule der Grundbetrag nicht zu. Eine Vorauszahlung ist zurückzuerstatten"
        ]
      }
    ]
  },
  {
    "title": "Ziffer 7",
    "blocks": [
      {
        "heading": "Einhaltung vereinbarter Termine",
        "paragraphs": [
          "Fahrschule, Fahrlehrer und Fahrschüler haben dafür zu sorgen, dass vereinbarte Fahrstunden pünktlich beginnen. Fahrstunden beginnen und enden grundsätzlich an der Fahrschule. Wird auf Wunsch des Fahrschülers davon abgewichen, wird die aufgewendete Fahrzeit zum Fahrstundensatz berechnet. Hat der Fahrlehrer den verspäteten Beginn einer Fahrstunde zu vertreten oder unterbricht er den praktischen Unterricht, so ist die ausgefallene Ausbildungszeit nachzuholen oder gutzuschreiben."
        ]
      },
      {
        "heading": "Wartezeiten bei Verspätung",
        "paragraphs": [
          "Verspätet sich der Fahrlehrer um mehr als 15 Minuten, so braucht der Fahrschüler nicht länger zu warten. Hat der Fahrschüler den verspäteten Beginn einer vereinbarten praktischen Ausbildung zu vertreten, so geht die ausgefallene Ausbildungszeit zu seinen Lasten. Verspätet er sich um mehr als 15 Minuten, braucht der Fahrlehrer nicht länger zu warten. Die vereinbarte Ausbildungszeit gilt dann als ausgefallen (Ziffer 3b Absatz 3)."
        ]
      },
      {
        "heading": "Ausfallentschädigung",
        "paragraphs": [
          "Die Ausfallentschädigung für die vom Fahrschüler nicht wahrgenommene Ausbildungszeit beträgt auch in diesem Falle drei Viertel des Fahrstundenentgelts. Dem Fahrschüler bleibt der Nachweis vorbehalten, ein Schaden sei nicht oder in wesentlich geringerer Höhe entstanden."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 8",
    "blocks": [
      {
        "heading": "Ausschluss vom Unterricht",
        "paragraphs": [
          "Der Fahrschüler ist vom Unterricht auszuschließen:",
          "a) Wenn er unter dem Einfluss von Alkohol oder anderen berauschenden Mitteln steht;",
          "b) Wenn anderweitig Zweifel an seiner Fahrtüchtigkeit begründet sind."
        ]
      },
      {
        "heading": "Ausfallentschädigung",
        "paragraphs": [
          "Der Fahrschüler hat in diesem Fall ebenfalls als Ausfallentschädigung drei Viertel des Fahrstundenentgelts zu entrichten. Dem Fahrschüler bleibt der Nachweis vorbehalten, ein Schaden sei nicht oder in wesentlich geringerer Höhe entstanden."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 9",
    "blocks": [
      {
        "heading": "Behandlung von Ausbildungsgerät und Fahrzeugen",
        "paragraphs": [
          "Der Fahrschüler ist zur pfleglichen Behandlung der Ausbildungsfahrzeuge, Lehrmodelle und des Anschauungsmaterials verpflichtet."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 10",
    "blocks": [
      {
        "heading": "Bedienung und Inbetriebnahme von Lehrfahrzeugen",
        "paragraphs": [
          "Ausbildungsfahrzeuge dürfen nur unter Aufsicht des Fahrlehrers bedient oder in Betrieb gesetzt werden. Zuwiderhandlungen können Strafverfolgung und Schadenersatzpflicht zur Folge haben."
        ]
      },
      {
        "heading": "Besondere Pflichten des Fahrschülers bei der Kraftradausbildung",
        "paragraphs": [
          "Geht bei der Kraftradausbildung oder -prüfung die Verbindung zwischen Fahrschüler und Fahrlehrer verloren, so muss der Fahrschüler unverzüglich (geeignete Stellen) anhalten, den Motor abstellen und auf den Fahrlehrer warten. Erforderlichenfalls hat er die Fahrschule zu verständigen. Beim Verlassen des Fahrzeugs hat er dieses ordnungsgemäß abzustellen und gegen unbefugte Benutzung zu sichern."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 11",
    "blocks": [
      {
        "heading": "Abschluss der Ausbildung",
        "paragraphs": [
          "Die Fahrschule darf die Ausbildung erst abschließen, wenn sie überzeugt ist, dass der Fahrschüler die notwendigen Kenntnisse und Fähigkeiten zum Führen eines Kraftfahrzeugs besitzt (§29 FahrlG).",
          "Deshalb entscheidet der Fahrlehrer nach pflichtgemäßem Ermessen über den Abschluss der Ausbildung (§6 FahrschAusbO)."
        ]
      },
      {
        "heading": "Anmeldung zur Prüfung",
        "paragraphs": [
          "Die Anmeldung zur Fahrerlaubnisprüfung bedarf der Zustimmung des Fahrschülers; sie ist für beide Teile verbindlich. Erscheint der Fahrschüler nicht zum Prüfungstermin, ist er zur Bezahlung des Entgelts für die Vorstellung zur Prüfung und verauslagter Gebühren verpflichtet."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 12",
    "blocks": [
      {
        "heading": "Gerichtsstand",
        "paragraphs": [
          "Hat der Fahrschüler keinen allgemeinen Gerichtsstand im Inland oder verlegt er nach Vertragsabschluss seinen Wohnsitz oder gewöhnlichen Aufenthaltsort aus dem Inland, oder ist der gewöhnliche Aufenthaltsort zum Zeitpunkt der Klageerhebung nicht bekannt, so ist der Sitz der Fahrschule der Gerichtsstand."
        ]
      }
    ]
  },
  {
    "title": "Ziffer 13",
    "blocks": [
      {
        "heading": "Hinweis",
        "paragraphs": [
          "Aus Gründen der besseren Lesbarkeit wurde in diesem Text auf die gleichzeitige Verwendung männlicher und weiblicher Sprachformen verzichtet. Sämtliche Personenbezeichnungen gelten gleichermaßen für beiderlei Geschlechter."
        ]
      }
    ]
  }
]
