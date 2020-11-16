import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Select from 'react-select';
import i18n from '../../lib/i18n';
import Anchor from '../../components/Anchor';
import { actions as textActions } from '../../flux/text';
import TipTrigger from '../../components/TipTrigger';
import { FACE_BACK, FACE_DOWN, FACE_FRONT, FACE_LEFT, FACE_RIGHT, FACE_UP } from '../../constants';

class Image3dParameters extends PureComponent {
    static propTypes = {
        disabled: PropTypes.bool,
        config: PropTypes.shape({
            face: PropTypes.string,
            minGray: PropTypes.number,
            maxGray: PropTypes.number,
            sliceDensity: PropTypes.number
        }),
        updateSelectedModelConfig: PropTypes.func.isRequired
    };

    state = {
        expanded: true
    };

    actions = {
        onToggleExpand: () => {
            this.setState(state => ({ expanded: !state.expanded }));
        },
        onChangeFace: (option) => {
            this.props.updateSelectedModelConfig({ face: option.value });
        },
        onChangeMinGray: (minGray) => {
            this.props.updateSelectedModelConfig({ minGray });
        },
        onChangeMaxGray: (maxGray) => {
            this.props.updateSelectedModelConfig({ maxGray });
        },
        onChangeSliceDensityGray: (sliceDensity) => {
            this.props.updateSelectedModelConfig({ sliceDensity });
        }
    };

    render() {
        const { config, disabled } = this.props;
        const { face } = config;
        const faceOptions = [{
            value: FACE_FRONT,
            label: FACE_FRONT
        }, {
            value: FACE_BACK,
            label: FACE_BACK
        }, {
            value: FACE_LEFT,
            label: FACE_LEFT
        }, {
            value: FACE_RIGHT,
            label: FACE_RIGHT
        }, {
            value: FACE_UP,
            label: FACE_UP
        }, {
            value: FACE_DOWN,
            label: FACE_DOWN
        }];
        const actions = this.actions;

        return (
            <div>
                <Anchor className="sm-parameter-header" onClick={this.actions.onToggleExpand}>
                    <span className="fa fa-gears sm-parameter-header__indicator" />
                    <span className="sm-parameter-header__title">{i18n._('Mesh')}</span>
                    <span className={classNames(
                        'fa',
                        this.state.expanded ? 'fa-angle-double-up' : 'fa-angle-double-down',
                        'sm-parameter-header__indicator',
                        'pull-right',
                    )}
                    />
                </Anchor>
                {this.state.expanded && (
                    <React.Fragment>
                        <TipTrigger
                            title={i18n._('Face')}
                            content={i18n._('Select the orientation of the model\'s facets')}
                        >
                            <div className="sm-parameter-row">
                                <span className="sm-parameter-row__label">{i18n._('Face')}</span>
                                <Select
                                    disabled={disabled}
                                    className="sm-parameter-row__select"
                                    backspaceRemoves={false}
                                    clearable={false}
                                    searchable={false}
                                    options={faceOptions}
                                    value={face}
                                    onChange={actions.onChangeFace}
                                />
                            </div>
                        </TipTrigger>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { fonts } = state.text;
    const fontOptions = fonts.map((font) => ({
        label: font.displayName,
        value: font.fontFamily
    }));
    fontOptions.unshift({
        label: `+ ${i18n._('Add Fonts')}`,
        value: 'AddFonts'
    });
    return {
        fontOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFont: (file) => dispatch(textActions.uploadFont(file))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Image3dParameters);