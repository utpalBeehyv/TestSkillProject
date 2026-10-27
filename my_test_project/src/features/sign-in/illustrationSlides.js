import rfpDiscoveryImage from '../../assets/sign-in/rfp-discovery.png'
import rfpDiscoveryIcon from '../../assets/sign-in/rfp-discovery-icon.svg'
import rfpReviewImage from '../../assets/sign-in/rfp-review-dossier.png'
import rfpReviewIcon from '../../assets/sign-in/rfp-review-icon.svg'
import rfpDecisionImage from '../../assets/sign-in/rfp-buyer-decision.png'
import rfpDecisionIcon from '../../assets/sign-in/rfp-decision-icon.svg'

/**
 * The three states the sign-in illustration panel cycles through,
 * measured from the Figma file's three "Sign up" cover copies (84:2,
 * 84:147, 84:243) — one screen, the illustration content is the only
 * part that differs per slide.
 */
export const illustrationSlides = [
  {
    title: 'RFP found',
    subtitle: 'New opportunity',
    image: rfpDiscoveryImage,
    imageAlt:
      'A magnifying glass inspecting a newly discovered RFP document among project folders.',
    icon: rfpDiscoveryIcon,
  },
  {
    title: 'Review requirements',
    subtitle: 'Check fit and evidence',
    image: rfpReviewImage,
    imageAlt: 'An RFP requirements document with items checked off.',
    icon: rfpReviewIcon,
  },
  {
    title: 'Decision followed',
    subtitle: 'Buyer portal update',
    image: rfpDecisionImage,
    imageAlt: 'A document with a notification bell, indicating a buyer portal update.',
    icon: rfpDecisionIcon,
  },
]
