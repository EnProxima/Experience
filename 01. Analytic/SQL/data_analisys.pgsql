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

SELECT *
FROM customers limit 5;  


SELECT * FROM generate_series('2029-01-01'::timestamp,'2030-12-31', '1 day');
SELECT *  FROM generate_series('1'::int,'10');


/* Shape data */

select 
case when  gender = 'F' then first_name end as "women",
case when  gender = 'M' then first_name end as "men"
from customers limit 10;

select * from retail_sales limit 10;

SELECT sales_month, kind_of_business, sales
,sum(sales) over (partition by sales_month) as total_sales
,sales * 100 / sum(sales) over (partition by sales_month) as pct_total
FROM retail_sales 
WHERE kind_of_business in ('Men''s clothing stores'
 ,'Women''s clothing stores')
;

SELECT sales_month
,avg(sales) over (order by sales_month 
                  rows between 11 preceding and current row
                  ) as moving_avg
,count(sales) over (order by sales_month 
                  rows between 11 preceding and current row
                  ) as records_count
FROM retail_sales
WHERE kind_of_business = 'Women''s clothing stores';


SELECT kind_of_business, sales_month, sales
,lag(sales_month) over (partition by kind_of_business 
                        order by sales_month
                        ) as prev_month
,lag(sales) over (partition by kind_of_business 
                  order by sales_month
                  ) as prev_month_sales
FROM retail_sales
WHERE kind_of_business = 'Book stores'
;

SELECT kind_of_business, sales_month, sales
,(sales / lag(sales) over (partition by kind_of_business 
                           order by sales_month)
 - 1) * 100 as pct_growth_from_previous
FROM retail_sales
WHERE kind_of_business = 'Book stores'
;



--------------------------------t_tickets
CREATE TABLE t_tickets(
parent_id VARCHAR(250),
product_group_name VARCHAR(250),
component VARCHAR(250),
product_name VARCHAR(250),
subsystem_name VARCHAR(250),
line VARCHAR(250),
direction VARCHAR(250),
domain VARCHAR(250),
role VARCHAR(250),
ws_type VARCHAR(250),
mh VARCHAR(250),
mho VARCHAR(250),
CompanyDepts VARCHAR (250)
)

/*normalization*/
CREATE SEQUENCE s_recid;
ALTER SEQUENCE s_recid
    OWNER TO postgres;
   
ALTER TABLE t_tickets ALTER id
   SET DEFAULT nextval('s_recid');

COPY t_tickets(parent_id,product_group_name,component,product_name,subsystem_name,line,direction,domain,role,ws_type,mh,mho,CompanyDepts)
FROM 'C:\experience\SQL\data\parents_ticket_all_ws.txt'
DELIMITER '	'
CSV HEADER;



SELECT  ws_type,
PERCENTILE_DISC(0.5) WITHIN GROUP(ORDER BY mh::float) as median,
avg(mh::float), 
max(mh::float), 
min(mh::float) 
FROM t_tickets
group by 1;


