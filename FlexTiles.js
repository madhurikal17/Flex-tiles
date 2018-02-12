$(document).ready(function(){
let hoveringOn = null;

const throttledOnHover = _.debounce(function() {
                                    
  const $all = $(this).parent().find('.box');
  const $others = $(this).siblings();
  const $hovering = $(this);
  const $prev = $(this).parent().find('.large');
  


  // previous index
  const prevOrderPos = parseInt($prev.css('order'));
  let hoveringOrderPos = parseInt($hovering.css('order'));
  let slotMin = hoveringOrderPos;
  let slotMax;
  
  // flag if bottom
    
  // apply offset, 3 more "slots" than 1
  if (prevOrderPos < hoveringOrderPos) {
    hoveringOrderPos += 3;
  }
  
  
  const isBottomRow = hoveringOrderPos % 2 === 1;
  debugger;
  
  if (isBottomRow) {
    slotMin = slotMin - 1;
  }
  
  slotMax = slotMin + 3;
  
  // disable animation for making divs smaller
  $others.addClass('disable-transition');
  $all.removeClass('large');
  setTimeout(() => $all.removeClass('disable-transition'));
  
  console.log('hovering target index', hoveringOrderPos);


  // clear all index
  $all.attr('order', '');
  
  // set order on the hovering item
  $hovering.css('order', slotMin);
  
  // fill in remaining order
  let j = 0;
  let $current;
  for (let i=0; i<$all.length; i++) {
    if (i < slotMin || i > slotMax) {
      $current = $($others[j]);
      $current.css('order', i);
      j++;
    }
  }
//   $others.each((i, el) => {
//     if (i === hoveringOrderPos) {
//       i++;
//     }
//     else {
//       $(el).css('order', i);
//     }
//     i++;
//   });
    
  // make this one bigger
  $hovering.addClass('large');
  
}, 333);


$('.box').hover(throttledOnHover);
})