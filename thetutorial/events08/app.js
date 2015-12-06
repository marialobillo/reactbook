render:function(){
  var visible;

  if( this.state.dropdownOpen ){
    visible = "visible";
  } else {
    visible = "hidden";
  }
  return (
    <div class="dropdown">
      <Badge />
  <button class="btn btn-default dropdown-toggle" >
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
  );
}
