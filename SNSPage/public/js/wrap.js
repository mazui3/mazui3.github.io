$("img").not('.page__logo img').each(function () {
   // $(this).attr("data-fancybox", "gallery"); 直接给img添加data-fancybox会导致点击图片后图片消失
    var element = document.createElement("a");
    $(element).attr("data-fancybox", "gallery");
    $(element).attr("href", $(this).attr("src"));
    $(this).wrap(element);
});
