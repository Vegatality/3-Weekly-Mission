import LinkCard from '@components/ui/molecules/card/link-card';
import { TCardProviderContext } from '@components/ui/molecules/card/link-card/context/CardProvider';

import { LinkType } from '@apis/link';

import styles from './Card.module.css';

type TCardProps = {
  link: LinkType.Link;
};
const Card = ({ link }: TCardProps) => {
  const processedSharedPageLinkData: TCardProviderContext = {
    linkId: link.id,
    createdAt: link.created_at,
    description: link.description,
    imageSource: link.image_source,
    url: link.url,
    title: link.title,
    favorite: link.favorite,
  };

  return (
    <LinkCard {...processedSharedPageLinkData}>
      <LinkCard.CardCover asAnchor className={styles['link-card']}>
        <div className={styles['card-image-box']}>
          <LinkCard.CardImage className={styles['link-image']} alt='카드 링크 이미지' />
        </div>
        <div className={styles['link-text-box']}>
          <LinkCard.TimeElapsed className={styles['link-elapsed']} />
          <LinkCard.Description className={styles['link-description']} />
          <LinkCard.CreatedAt className={styles['link-createdAt']} />
        </div>
      </LinkCard.CardCover>
    </LinkCard>
  );
};

export default Card;
