///<reference path="./main.ts" />
module mdTutorial {
    app.directive('mdtTap', mdtTap);

    function mdtTap() {

        var downTimeToCancel = 500,
            scrollThreshold = 15;

        function linkFn(scope:any, elem:any, attrs) {
            var start = 0,
                startX,
                startY,
                isFocus = false;

            function destroy() {
                elem.off('mouseup');
                elem.off('touchend');
                elem.off('mousedown');
                elem.off('touchstart');
                elem.off('touchcancel');
                elem.off('keypress');
                elem.off('focus');
                elem.off('blur');
            }

            function normalizeEvent(e) {
                var newE = e;
                if (e.touches && e.touches.length) {
                    newE = e.touches[0];
                    if (e.touches.length > 1) {
                        newE = null;
                    }
                } else if (e.changedTouches) {
                    newE = e.changedTouches[0];
                    if (e.changedTouches.length > 1) {
                        newE = null;
                    }
                }

                return newE;
            }

            function clear() {
                start = 0;
                startX = 0;
                startY = 0;
            }

            function down(e) {
                e = normalizeEvent(e);
                if (e === null) {
                    return clear();
                }
                startX = +e.clientX;
                startY = +e.clientY;
                start = +Date.now();
            }

            function trigger(e) {
                scope.$apply(attrs.mdtTap);
                clear();
                // Prevent default action, like scrolling
                e.preventDefault();
            }

            function triggerPointer(e) {
                var newE = normalizeEvent(e);
                if (newE === null) {
                    return clear();
                }
                if ((+Date.now() - start) > downTimeToCancel) {
                    // if the button has been held down too long, do not trigger
                    return;
                }
                if (Math.abs(+newE.clientX - startX) > scrollThreshold) {
                    return;
                }
                if (Math.abs(+newE.clientY - startY) > scrollThreshold) {
                    return;
                }
                trigger(e);
            }

            function focus() {
                console.log('focus');
                isFocus = true;
            }

            function blur() {
                isFocus = false;
            }

            angular.element(elem).attr('ontouchstart', ' ');
            elem.on('focus', focus);
            elem.on('blur', blur);
            elem.on('touchend', function (e) {
                e.preventDefault();
                triggerPointer(e);
            });
            elem.on('keypress', function (e) {
                if (!isFocus) {
                    return;
                }
                trigger(e);
            });
            elem.on('mouseup', triggerPointer);
            elem.on('mousedown', down);
            elem.on('touchstart', down);
            elem.on('$destroy', destroy);
            elem.on('touchcancel', clear);
        }

        return {
            restrict: 'A',
            link: linkFn
        };
    }
}
