import classNames from 'classnames/bind';

import { useMatchedLinksWithDebounce } from '@hooks/useMatchedLinksWithDebounce';

import styles from './CardContainer.module.css';
import Card from './comp/card/Card';
import { useGetSortedFolderLinksData } from './hooks/useGetFolderLinks.query';

const cn = classNames.bind(styles);

type TCardContainerProps = {
  folderId: number;
  input?: string;
};

const CardContainer = ({ folderId, input }: TCardContainerProps) => {
  const { data = [] } = useGetSortedFolderLinksData(folderId);

  const matchedLinks = useMatchedLinksWithDebounce(data, input, ['title', 'description', 'url']);

  return (
    <section className={cn('card-container')}>
      {matchedLinks.map((link) => (
        <Card key={link?.id} link={link} />
      ))}
    </section>
  );
};

export default CardContainer;
