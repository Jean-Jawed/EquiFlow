import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" title="Retour à l'accueil" className="inline-block transition-transform hover:scale-105">
            <img src="/logo_equiflow.jpg" alt="EquiFlow Logo" className="w-12 h-12 rounded-xl shadow-sm border border-gray-100" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-indigo max-w-none">
          <h1 className="text-3xl font-bold mb-2">Politique de confidentialité</h1>
          <p className="text-gray-500 text-sm mb-8">Dernière mise à jour : 29 avril 2026</p>

          <p>
            La présente politique de confidentialité décrit la manière dont les données sont traitées dans le cadre de l'utilisation du site equiflow.fr et de l'application Android Equiflow (ci-après désignés ensemble « le Service »). Elle s'applique de manière identique aux deux, le traitement des données étant strictement le même.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données est :</p>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>Jawed Tahir</strong>, résidant à Marseille, France</li>
            <li><strong>Contact e-mail :</strong> jawed_tahir@yahoo.fr</li>
            <li><strong>Formulaire de contact :</strong> <a href="https://javed.fr/contact.html" className="text-primary hover:underline">https://javed.fr/contact.html</a></li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Principe général : aucune identification personnelle</h2>
          <p>
            Equiflow est conçu pour fonctionner sans inscription, sans création de compte et sans authentification. Aucune adresse e-mail, aucun mot de passe, aucun numéro de téléphone, aucun identifiant publicitaire, aucune donnée de localisation et aucune donnée biométrique ne sont demandés ni collectés.
          </p>
          <p>
            Le Service n'utilise ni Firebase Analytics, ni Crashlytics, ni aucun outil tiers de mesure d'audience, de suivi ou de publicité. L'application Android ne demande aucune permission système sensible (contacts, stockage, caméra, localisation, etc.).
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Données traitées</h2>
          <p>
            Les seules données traitées sont celles que vous saisissez volontairement pour utiliser la fonction de partage de dépenses, à savoir :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Le nom du groupe (par exemple : « Voyage à Cracovie ») ;</li>
            <li>Les noms ou surnoms des participants tels que vous les saisissez ;</li>
            <li>Les dépenses associées au groupe : montants, libellés, dates, répartition entre participants.</li>
          </ul>
          <p>
            Ces données sont saisies librement par vous. Il vous appartient de ne renseigner que des informations que vous êtes autorisé à partager, en particulier concernant les autres participants. Nous vous recommandons d'utiliser des prénoms ou des surnoms plutôt que des noms complets.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Finalité du traitement</h2>
          <p>
            Les données sont utilisées exclusivement pour permettre le fonctionnement du Service, c'est-à-dire :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Calculer la répartition et le rééquilibrage des dépenses entre les participants d'un groupe ;</li>
            <li>Permettre à toute personne disposant du lien de partage du groupe d'accéder aux mêmes informations et de contribuer au groupe.</li>
          </ul>
          <p>
            Aucune donnée n'est utilisée à des fins de profilage, de publicité, de revente, de statistiques ou de toute autre finalité que celles décrites ci-dessus. Aucune donnée n'est transmise à des tiers à des fins commerciales.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Base légale (RGPD)</h2>
          <p>
            Le traitement repose sur l'exécution du Service à votre demande, ce qui correspond à la base légale du consentement (article 6.1.a du RGPD) : en saisissant des données dans un groupe, vous consentez librement à leur enregistrement aux seules fins décrites ci-dessus.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Modèle d'accès et de partage</h2>
          <p>
            Chaque groupe est identifié par un identifiant unique. Toute personne disposant du lien de partage d'un groupe peut consulter et modifier son contenu. Il vous appartient de ne partager ce lien qu'avec les personnes concernées.
          </p>
          <p>
            L'identifiant du groupe est conçu pour être imprévisible, mais il ne constitue pas un mécanisme d'authentification : nous vous recommandons donc de ne pas saisir d'informations sensibles dans un groupe.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Hébergement et localisation des données</h2>
          <p>
            Les données sont stockées dans la base de données Cloud Firestore, service fourni par Google Ireland Limited (Google Cloud).
          </p>
          <p>
            L'hébergement est configuré sur la région multi-régionale eur3 (Europe), ce qui signifie que les données sont stockées exclusivement au sein de l'Union européenne.
          </p>
          <p>
            Google Cloud agit en qualité de sous-traitant au sens du RGPD. Pour plus d'informations sur les engagements de Google en matière de protection des données, vous pouvez consulter : <a href="https://cloud.google.com/terms/data-processing-addendum" className="text-primary hover:underline">https://cloud.google.com/terms/data-processing-addendum</a>
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Durée de conservation et suppression</h2>
          <p>
            Les données d'un groupe sont conservées tant qu'elles sont utiles à son fonctionnement, dans la limite des règles suivantes :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>Suppression à la demande :</strong> toute personne disposant de l'identifiant d'un groupe peut le supprimer à tout moment depuis l'application Android ou depuis le site equiflow.fr. La suppression entraîne l'effacement définitif et irréversible de toutes les données associées au groupe (nom, participants, dépenses). Aucune copie n'est conservée.</li>
            <li><strong>Suppression automatique pour inactivité :</strong> tout groupe sans aucune activité (création, modification ou consultation) pendant 36 mois consécutifs est automatiquement et définitivement supprimé.</li>
          </ul>
          <p>
            En l'absence d'identification des utilisateurs, la suppression d'un groupe ne peut être déclenchée que par une personne disposant de son identifiant. Si vous perdez l'accès à un groupe, il ne nous est techniquement pas possible de le retrouver ni de le supprimer à votre place, faute de pouvoir vérifier votre lien avec ce groupe.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. Vos droits</h2>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Droit d'accès, de rectification et d'effacement ;</li>
            <li>Droit à la limitation du traitement ;</li>
            <li>Droit à la portabilité ;</li>
            <li>Droit de retirer votre consentement à tout moment.</li>
          </ul>
          <p>En pratique, en raison de l'absence d'identification :</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Le droit d'accès et de rectification s'exerce directement via l'application ou le site, à condition de disposer de l'identifiant du groupe concerné ;</li>
            <li>Le droit à l'effacement s'exerce en supprimant le groupe via l'application ou le site ;</li>
            <li>Le droit de retirer votre consentement s'exerce en supprimant le groupe ou en cessant d'utiliser le Service.</li>
          </ul>
          <p>
            Pour toute question relative à vos droits, vous pouvez nous contacter à jawed_tahir@yahoo.fr. Nous nous engageons à répondre dans un délai d'un mois.
          </p>
          <p>
            Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL), 3 place de Fontenoy, 75007 Paris — <a href="https://www.cnil.fr" className="text-primary hover:underline">www.cnil.fr</a>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">10. Sécurité</h2>
          <p>
            Les données sont transmises via des connexions chiffrées (HTTPS / TLS) entre votre appareil et les serveurs de Google Cloud, et stockées sur l'infrastructure sécurisée de Google Cloud, qui applique des mesures techniques et organisationnelles conformes aux standards de l'industrie.
          </p>
          <p>
            Compte tenu de l'absence de mécanisme d'authentification, la sécurité des données d'un groupe repose en partie sur la confidentialité du lien de partage : nous vous recommandons de ne le partager qu'avec les personnes concernées et par un canal de confiance.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">11. Mineurs</h2>
          <p>
            Le Service est accessible à tous, y compris aux mineurs. Aucune donnée d'identification, de localisation ou de contact n'étant collectée, le Service ne présente pas de risque spécifique pour les enfants au sens des règles applicables (notamment le RGPD et les exigences Google Play en matière de sécurité des enfants).
          </p>
          <p>
            Nous recommandons toutefois aux parents et tuteurs d'accompagner les jeunes utilisateurs dans le choix des informations qu'ils saisissent (privilégier les prénoms ou surnoms, éviter toute donnée sensible).
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">12. Cookies et traceurs</h2>
          <p>
            Le site equiflow.fr n'utilise aucun cookie de mesure d'audience, de publicité ou de profilage. Seuls des éléments techniques strictement nécessaires au fonctionnement du site peuvent être utilisés (par exemple, le stockage local du navigateur pour conserver l'état de votre session sur votre propre appareil).
          </p>
          <p>
            L'application Android n'utilise aucun traceur publicitaire et ne demande pas d'identifiant publicitaire.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">13. Modifications de la présente politique</h2>
          <p>
            La présente politique peut être mise à jour pour refléter des évolutions du Service ou de la réglementation. La date de dernière mise à jour figure en haut du document. Les modifications prennent effet dès leur publication sur cette page.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">14. Contact</h2>
          <p>
            Pour toute question relative à cette politique ou au traitement de vos données :<br />
            <strong>E-mail :</strong> jawed_tahir@yahoo.fr<br />
            <strong>Formulaire :</strong> <a href="https://javed.fr/contact.html" className="text-primary hover:underline">https://javed.fr/contact.html</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
