import { connect } from 'react-redux';
import { selectLanguage, LanguageSelection } from '../actions';
import SelectBox from '../components/SelectBox';

const mapStateToProps = () => ({
  selectItems: LanguageSelection,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (language) => dispatch(selectLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBox);
