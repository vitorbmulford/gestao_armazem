import React from 'react';
import { Week, Recipe } from '../contexts/AppContext';
import { APP_TITLE } from '../const';

interface PrintableMenuProps {
  week: Week;
  recipes: Recipe[];
}

export const PrintableMenu: React.FC<PrintableMenuProps> = ({ week, recipes }) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const getRecipeGarnishes = (recipe: Recipe | undefined): string => {
    if (!recipe) return '';
    
    // Se a receita tem guarnições customizadas
    if (recipe.garnishes && recipe.garnishes.length > 0) {
      return recipe.garnishes
        .map(g => {
          // Se é uma receita de guarnição (recipeId)
          if (g.recipeId) {
            const garnishRecipe = recipes.find(r => r.id === g.recipeId);
            return garnishRecipe?.name || '';
          }
          return '';
        })
        .filter(Boolean)
        .join(' + ');
    }
    
    // Guarnição padrão para receitas que não são pratos únicos
    if (recipe.category !== 'unicos') {
      return 'Arroz + Feijão + Salada';
    }
    
    return '';
  };

  return (
    <div className="printable-menu">
      {/* Cabeçalho */}
      <div className="print-header">
        <h1>{APP_TITLE}</h1>
        <h2>Cardápio da Semana</h2>
        <h3>{week.title}</h3>
        <div className="print-date">
          {new Date().toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
      </div>

      {/* Cardápio */}
      <div className="print-menu">
        <table className="menu-table">
          <thead>
            <tr>
              <th className="day-column">Dia</th>
              <th className="option-column">Opção 1</th>
              <th className="option-column">Opção 2</th>
              <th className="option-column">Opção 3</th>
            </tr>
          </thead>
          <tbody>
            {week.days.map((day, idx) => {
              const dishes = day.dishes;
              const dishRecipes = dishes.map(dish => 
                recipes.find((r: Recipe) => r.id === dish.recipeId)
              );

              return (
                <tr key={idx}>
                  <td className="day-cell">
                    <strong>{daysOfWeek[idx]}</strong>
                  </td>
                  {dishes.map((dish, dishIdx) => {
                    const recipe = dishRecipes[dishIdx];
                    const garnishes = getRecipeGarnishes(recipe);

                    return (
                      <td key={dishIdx} className="dish-cell">
                        <div className="dish-name">{dish.name}</div>
                        {garnishes && (
                          <div className="dish-garnishes">{garnishes}</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rodapé */}
      <div className="print-footer">
        <p>📞 Faça seu pedido: (XX) XXXXX-XXXX</p>
        <p>🕐 Horário de entrega: 11h às 13h</p>
        <p>💳 Aceitamos: Dinheiro, Pix, Cartão</p>
      </div>

      {/* Estilos de impressão */}
      <style>{`
        @media print {
          /* Ocultar tudo exceto o printable-menu */
          body * {
            visibility: hidden;
          }
          
          .printable-menu,
          .printable-menu * {
            visibility: visible;
          }
          
          .printable-menu {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          /* Remover margens padrão */
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }

        .printable-menu {
          font-family: Arial, sans-serif;
          max-width: 210mm;
          margin: 0 auto;
          padding: 20px;
          background: white;
        }

        .print-header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #f97316;
          padding-bottom: 20px;
        }

        .print-header h1 {
          font-size: 28px;
          color: #f97316;
          margin: 0 0 10px 0;
          font-weight: bold;
        }

        .print-header h2 {
          font-size: 20px;
          color: #333;
          margin: 0 0 5px 0;
        }

        .print-header h3 {
          font-size: 16px;
          color: #666;
          margin: 0 0 10px 0;
          font-weight: normal;
        }

        .print-date {
          font-size: 12px;
          color: #999;
        }

        .menu-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }

        .menu-table th {
          background-color: #f97316;
          color: white;
          padding: 12px 8px;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
        }

        .menu-table td {
          padding: 15px 8px;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }

        .menu-table tr:last-child td {
          border-bottom: 2px solid #f97316;
        }

        .day-column {
          width: 15%;
        }

        .option-column {
          width: 28.33%;
        }

        .day-cell {
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }

        .dish-name {
          font-size: 14px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 6px;
        }

        .dish-garnishes {
          font-size: 11px;
          color: #6b7280;
          font-style: italic;
          line-height: 1.4;
        }

        .print-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          margin-top: 20px;
        }

        .print-footer p {
          margin: 8px 0;
          font-size: 13px;
          color: #333;
        }

        @media print {
          .print-header h1 {
            font-size: 24px;
          }
          
          .print-header h2 {
            font-size: 18px;
          }
          
          .menu-table th {
            font-size: 12px;
            padding: 10px 6px;
          }
          
          .menu-table td {
            padding: 12px 6px;
          }
          
          .dish-name {
            font-size: 13px;
          }
          
          .dish-garnishes {
            font-size: 10px;
          }
          
          .print-footer p {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};
