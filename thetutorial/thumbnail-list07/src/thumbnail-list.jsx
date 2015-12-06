var Thumbnail = require('thumbnail');

var ThumbnailList = React.createClass({
  render: function() {
    var list = this.props.thumbnailData.map(function(thumbnailProps){
      return <Thumbnail {...thumbnailProps} />
    });

    return (
      <div>{list}</div>
    );
  }
});
