import classNames from 'classnames/bind';

import { useInput } from '@hooks/useInput';

import styles from './Article.module.css';
import CardContainer from './comp/card-container/CardContainer';
import SearchBar from './comp/search-bar/SearchBar';

const cn = classNames.bind(styles);

type TArticleProps = {
  folderId: number;
};

const Article = ({ folderId }: TArticleProps) => {
  const [input, onChange, clearInput] = useInput('');

  return (
    <article className={cn('contents')}>
      <div className={cn('article-area')}>
        <SearchBar clearInput={clearInput} input={input} onChange={onChange} />
        <CardContainer folderId={folderId} input={input} />
      </div>
    </article>
  );
};

export default Article;
