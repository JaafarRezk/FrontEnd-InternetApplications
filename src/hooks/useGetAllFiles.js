import { useState, useEffect } from "react";
import fileService from "../services/fileService";

const useGetAllFiles = () => {
  const [allFiles, setAllFiles] = useState([]); // تعديل اسم المتغير ليعكس أنه لكل الملفات
  const [isLoading, setIsLoading] = useState(false); // تغيير اسم حالة التحميل
  const [fetchError, setFetchError] = useState(null); // تغيير اسم الخطأ ليكون أكثر تحديدًا
  const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  const [totalPages, setTotalPages] = useState(1); // إجمالي عدد الصفحات
  const [shouldFetch, setShouldFetch] = useState(true); // تحديد ما إذا كان يجب جلب البيانات
  const [nextPageUrl, setNextPageUrl] = useState(null); // رابط الصفحة التالية
  const [prevPageUrl, setPrevPageUrl] = useState(null); // رابط الصفحة السابقة

  // وظيفة لجلب كل الملفات
  const fetchAllFiles = async (pageUrl = 'http://127.0.0.1:8000/api/file/getAllFiles?page=1') => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const response = await fileService.getAllFiles(pageUrl); 
      if (response.success) {
        setAllFiles(response.data.data); // تحديث قائمة كل الملفات
        setCurrentPage(response.data.current_page); // تحديث الصفحة الحالية
        setTotalPages(response.data.last_page); // إجمالي الصفحات
        setNextPageUrl(response.data.next_page_url); // رابط الصفحة التالية
        setPrevPageUrl(response.data.prev_page_url); // رابط الصفحة السابقة
      } else {
        setFetchError("No files found."); // رسالة خطأ إذا لم يتم العثور على ملفات
      }
    } catch (err) {
      setFetchError("Error fetching all files"); // التعامل مع الأخطاء
    } finally {
      setIsLoading(false); // إنهاء حالة التحميل
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchAllFiles(); // جلب الملفات عند الحاجة
      setShouldFetch(false); // منع الجلب المتكرر غير الضروري
    }

    const intervalId = setInterval(() => {
      fetchAllFiles(); // جلب الملفات بشكل دوري
    }, 60000); // تحديث البيانات كل دقيقة

    return () => clearInterval(intervalId); // تنظيف المؤقت عند التفكيك
  }, [shouldFetch]);

  return { 
    allFiles, // كل الملفات
    isLoading, // حالة التحميل
    fetchError, // الأخطاء
    fetchAllFiles, // وظيفة لجلب الملفات
    currentPage, // الصفحة الحالية
    totalPages, // إجمالي الصفحات
    nextPageUrl, // رابط الصفحة التالية
    prevPageUrl // رابط الصفحة السابقة
  };
};

export default useGetAllFiles;
