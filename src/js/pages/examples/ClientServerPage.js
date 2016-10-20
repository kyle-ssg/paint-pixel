import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import ExampleAPI from '../../../../common/data/example_api';
import  parseParams from '../../utils/parse-params';

const ClientServerPage = class extends Component {
    displayName: 'ClientServerPage';

    constructor (props, context) {
        super(props, context);
        let params = parseParams(props.params);
        this.state = {
            isServerRendered: params.collection ? true : false,
            collection: params.collection
        };
        console.log(this.state);
    }

    componentDidMount () {
        if (!this.state.collection) {
            ExampleAPI.getCollection(this.props.params.id)
                .then((collection)=> {
                    this.setState({ collection });
                });
        }
    }

    render () {
        const { collection, isServerRendered } = this.state;
        return (
            <DocumentTitle title="client-server">
                <div className="container">
                    <h2>
                        { isServerRendered ?
                            'Rendered entirely by the server without API call' :
                            'Rendered with pre-loader and API call'
                        }
                    </h2>

                    {collection ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{collection.id}</td>
                                <td>{collection.title}</td>
                            </tr>
                            </tbody>
                        </table>
                    ) : <p>Loading...</p> }

                </div>
            </DocumentTitle>
        );
    }
};

module.exports = ClientServerPage;