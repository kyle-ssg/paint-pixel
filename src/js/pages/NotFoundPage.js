import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';

const NotFoundPage = class extends Component {
    displayName: 'NotFoundPage';

    render () {
        return (
            <DocumentTitle title="404">
                <div>
                    404 Page
                </div>
            </DocumentTitle>
        );
    }
};

module.exports = NotFoundPage;