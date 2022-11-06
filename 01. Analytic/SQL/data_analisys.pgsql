/*Check table structure*/

select * from retail_sales limit 5;
select distinct reason_for_null from retail_sales;
select * from sales limit 5;

/* Replace  null values according to reason_for_null field
and save result to new table retail_sales_cleared */
drop  table if EXISTS  retail_sales_cleared ;
create table retail_sales_cleared as (
select sales_month, kind_of_business,
case 
 when sales is null and reason_for_null ='Not Available' then 0  
 when sales is null and reason_for_null ='Supressed' then null
 else sales
end as sales
 from retail_sales);

/*Check trends in kinds of business */

select kind_of_business,date_part('year',sales_month),
 sum(sales)  
from retail_sales_cleared
GROUP by 1,2
ORDER BY 2,1;

/*Check the frequesncy */
select customer_id,
select customer_id,count(1) from sales
where customer_id BETWEEN 1 and 100
group  by 1

select  * from sales  limit 5 




