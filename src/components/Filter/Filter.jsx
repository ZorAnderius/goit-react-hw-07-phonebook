import { useDispatch, useSelector } from 'react-redux';
import filterCSS from './Filter.module.css';
import { getFilterQuery } from 'redux/selectors';
import { addFilterQuery } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(getFilterQuery);

  const onChangeFilterValue = e =>
    dispatch(addFilterQuery(e.currentTarget.value));
  return (
    <div className={filterCSS.filter_container}>
      <label className={filterCSS.filter_label}>
        Find contacts by the name
      </label>
      <input
        className={filterCSS.filter_input}
        type="text"
        value={value}
        onChange={onChangeFilterValue}
      />
    </div>
  );
};
