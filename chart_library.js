/* assets/js/chart_library.js */

// الكود يهدف إلى تشغيل رسم بياني يوضح تطور الإيرادات (خط أزرق) مقابل الأثر البيئي (خط أخضر)
// هذا هو دليل على نمو المشروع والاستدامة معاً.

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تحقق من وجود العنصر (Canvas) الذي سيحتوي على الرسم البياني
    const ctx = document.getElementById('impactChart');

    // إذا لم يكن العنصر موجوداً، فلن يتم تشغيل الكود (مهم لمرحلة MVP)
    if (ctx) {
        
        // 2. بيانات المحاكاة: أرقام بسيطة لنمو 4 دورات عمل (الأشهر أو الأرباع)
        const labels = ['الدورة الأولى', 'الدورة الثانية', 'الدورة الثالثة', 'الدورة الرابعة (توقع)'];

        const revenueData = [5000, 8500, 12000, 18000]; // الإيرادات (SAR)
        const impactData = [50000, 105000, 180000, 280000]; // الأثر (KG CO2 Saved)

        // 3. إنشاء كائن الرسم البياني (Chart Object)
        new Chart(ctx, {
            type: 'line', // نوع الرسم البياني: خطي
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'إجمالي الإيرادات (SAR)',
                        data: revenueData,
                        borderColor: '#0d47a1', // الأزرق الداكن للعلامة التجارية
                        backgroundColor: 'rgba(13, 71, 161, 0.1)',
                        borderWidth: 3,
                        tension: 0.4, // لجعل الخطوط منحنية وعصرية
                        yAxisID: 'y'
                    },
                    {
                        label: 'تخفيض CO2 (كجم)',
                        data: impactData,
                        borderColor: '#00c853', // الأخضر للاستدامة
                        backgroundColor: 'rgba(0, 200, 83, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        rtl: true // دعم RTL لعنوان البيانات
                    },
                    title: {
                        display: true,
                        text: 'تطور الأداء المالي والبيئي لـ RE:SOURCE',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'right', // وضع الإيرادات على اليمين (للقراءة العربية)
                        title: {
                            display: true,
                            text: 'الإيرادات (SAR)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'left', // وضع الأثر على اليسار
                        title: {
                            display: true,
                            text: 'الأثر البيئي (كجم CO2)'
                        },
                        grid: {
                            drawOnChartArea: false, // لا نريد تداخل خطوط الشبكة
                        },
                    },
                    x: {
                        reverse: true // عكس ترتيب المحور السيني لدعم القراءة من اليمين لليسار (RTL)
                    }
                }
            }
        });
    }
});
/* assets/js/client_charts.js */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تحديد عنصر Canvas للرسم البياني الخاص بالعميل
    const ctx = document.getElementById('clientImpactChart');

    if (ctx) {
        
        // 2. بيانات المحاكاة لـ "فندق الساحل الذهبي" (أثر التراكمي على مدى 4 عمليات جمع)
        const collectionDates = ['يوليو', 'سبتمبر', 'أكتوبر', 'نوفمبر (المخطط)'];
        
        // الأثر التراكمي لـ CO2 المحفوظة (بالكيلوغرام)
        const cumulativeImpact = [750, 1900, 3200, 4500]; 
        
        // الهدف السنوي للعميل (خط ثابت)
        const annualGoal = 5000; 
        const goalData = [annualGoal, annualGoal, annualGoal, annualGoal]; 

        // 3. إنشاء كائن الرسم البياني (Chart Object)
        new Chart(ctx, {
            type: 'line', // نوع الرسم البياني: خطي
            data: {
                labels: collectionDates,
                datasets: [
                    {
                        label: 'الأثر التراكمي (تخفيض CO2 بالكجم)',
                        data: cumulativeImpact,
                        borderColor: '#00bfa5', // الأخضر الزمردي (الأثر الفعلي)
                        backgroundColor: 'rgba(0, 191, 165, 0.3)',
                        fill: true, // ملء المنطقة أسفل الخط
                        tension: 0.3,
                        borderWidth: 3
                    },
                    {
                        label: 'الهدف السنوي لخفض CO2',
                        data: goalData,
                        borderColor: '#e65100', // البرتقالي (الهدف)
                        borderDash: [5, 5], // خط منقط للهدف
                        borderWidth: 2,
                        pointRadius: 0 // إخفاء النقاط
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // للسماح بتحديد ارتفاع Canvas
                plugins: {
                    legend: {
                        position: 'top',
                        rtl: true
                    },
                    title: {
                        display: true,
                        text: 'الأثر التراكمي لانبعاثات ثاني أكسيد الكربون مقارنة بالهدف السنوي',
                        font: { size: 18, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'الوزن (كجم CO2)',
                            font: { size: 14 }
                        }
                    },
                    x: {
                        reverse: true // لدعم RTL
                    }
                }
            }
        });
    }
});