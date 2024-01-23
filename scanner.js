document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('scanner');
    const productInfo = document.getElementById('product-info');

    function startScanner() {
        console.log('Initializing Quagga...');
        // Configure QuaggaJS
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: video,
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: 'environment',
                },
            },
            decoder: {
                readers: ['ean_reader'],
                debug: {
                    drawBoundingBox: true,
                    showFrequency: false,
                    drawScanline: true,
                    showPattern: false,
                },
            },
        }, function (err) {
            if (err) {
                console.error('Error initializing Quagga:', err);
                return;
            }
            console.log('Quagga initialized successfully. Starting scanner...');
            Quagga.start();
        });

        // Add event listener for when a barcode is detected
        Quagga.onDetected(function (result) {
            console.log('Barcode detected:', result);
            const code = result.codeResult.code;
            productInfo.innerHTML = 'Product Code: ' + code;

            // You can perform additional actions here, such as calling an API with the barcode information.
            // For simplicity, we're just displaying the code in the productInfo div.
        });
    }

    window.startScanner = startScanner;
});
Quagga.onDetected(function (result) {
    console.log('Barcode detected:', result);
    const code = result.codeResult.code;
    productInfo.innerHTML = 'Product Code: ' + code;
});
